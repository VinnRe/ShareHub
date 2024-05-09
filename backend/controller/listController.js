const catchAsync = require("./../utils/catchAsync");
const List = require("../model/listModel");
const User = require("../model/userModel");
const Receipt = require("../model/receiptModel");
const Request = require("../model/requestModel");

exports.createList = catchAsync(async (req, res) => {
  const { title, details, tags, media, user } = req.body;
  try {
      if (!user || !user._id) {
          return res.status(400).json({ error: "User ID is required" });
      }

      const newList = await List.create({
          title: title,
          details: details,
          tags: tags,
          creator: user._id,
          createdAt: Date.now(),
          media: media,
      });
      console.log(newList);

      res.status(201).json(newList);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


exports.fetchUnapproved = catchAsync(async (req, res) => {
  try {
      const unapprovedLists = await List.find({ approved: false }).sort({ createdAt: -1 });
      const result = [];
      for (let i = 0; i < unapprovedLists.length; ++i) {
        const owner = await User.findById(unapprovedLists[i].creator, { _id: 0, password: 0, email: 0 });
        result.push({ listData: unapprovedLists[i], ownerInfo: owner });
    }
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({ error: "Couldn't fetch unapproved lists" });
  }
});

exports.fetchApproved = catchAsync(async (req, res) => {
  try {
      const approvedLists = await List.find({ approved: true }).sort({ createdAt: -1 });
      const result = [];
      for (let i = 0; i < approvedLists.length; ++i) {
        const owner = await User.findById(approvedLists[i].creator, { _id: 0, password: 0, email: 0 });
        result.push({ listData: approvedLists[i], ownerInfo: owner });
    }
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({ error: "Couldn't fetch approved lists" });
  }
});

exports.approveList = catchAsync(async (req, res) => {
  const { listId } = req.body;
  try {
      const list = await List.findById(listId);
      if (!list) {
          return res.status(404).json({ error: "List not found" });
      }
      list.approved = true;
      await list.save();
      res.status(200).json({ message: "List approved successfully" });
  } catch (err) {
      res.status(500).json({ error: "Couldn't approve list" });
  }
});

exports.deleteList = catchAsync(async (req, res) => {
  const { listId } = req.body;
  try {
    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Couldn't delete list" });
  }
});

exports.fetchOptions = catchAsync(async (req, res) => {
    const { options, name } = req.body;
    const requestedUser = await User.findOne({ name: name });
  
    if(!requestedUser){
      res.status(404).json("User not found!");
      return;
    }
  
    switch (options) {
      case "recent_material":
        const resource = await Resource.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
        res.status(200).json(resource);
        break;
  
      case "recent_doubts":
        const post = await Post.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
        res.status(200).json(post);
        break;
  
      case "recent_replies":
        const replies = await Reply.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
        res.status(200).json(replies);
        break;
    }
  });

  exports.filterByTags = catchAsync(async (req, res) => {
    const { tags } = req.body;
    try {
        const filteredResources = await List.find({ tags: { $in: tags }, approved: true }).sort({ createdAt: -1 });

        const result = [];
        for (let i = 0; i < filteredResources.length; ++i) {
            const owner = await User.findById(filteredResources[i].creator, { _id: 0, password: 0, email: 0 });
            result.push({ listData: filteredResources[i], ownerInfo: owner });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json("Error occurred while filtering resources. Please try again!");
    }
});

exports.searchList = catchAsync(async (req, res) => {
    const { searchTerm } = req.body;
    try {
        let searchedList = await List.find({ title: { $regex: new RegExp(searchTerm, 'i') }, approved: true }).sort({ createdAt: -1 });
        if (searchedList.length === 0) {
            const user = await User.findOne({ name: { $regex: new RegExp(searchTerm, 'i') } });
            const userId = user._id;
            searchedList = await List.find({ creator: userId, approved: true }).sort({ createdAt: -1 });
        }

        const result = [];
        for (let i = 0; i < searchedList.length; ++i) {
            const owner = await User.findById(searchedList[i].creator, { _id: 0, password: 0, email: 0 });
            result.push({ listData: searchedList[i], ownerInfo: owner });
        }
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error occurred while searching for listing. Please try again!");
    }
});

exports.request = catchAsync(async (req, res) => {
  const { listId, requesterId, date } = req.body;
  try {
      const list = await List.findById(listId);
      if (!list) {
          return res.status(404).json({ error: "List not found" });
      }
      
      const request = await Request.create({
          list: listId,
          listInfo: list,
          listCreator: list.creator,
          requester: requesterId,
          status: 'pending',
          dateOfRequest: date
      });
      res.status(201).json({ message: "Request sent successfully", request: request });
  } catch (err) {
      res.status(500).json({ error: "Couldn't send request" });
  }
});


exports.acceptRequest = catchAsync(async (req, res) => {
  const { requestId } = req.body;
  try {
      const request = await Request.findById(requestId).populate('list');
      if (!request) {
          return res.status(404).json({ error: "Request not found" });
      }
      if (request.status === 'accepted') {
          return res.status(400).json({ error: "Request already accepted" });
      }
      await request.save();

      const receipt = await Receipt.create({
          list: request.list,
          listInfo: request.listInfo,
          requester: request.requester,
          sharer: request.listCreator,
          dateOfRequest: request.dateOfRequest
      });

      await Request.findByIdAndDelete(requestId);
      await List.findByIdAndDelete(req.list._id);

      res.status(200).json({ message: "Request accepted successfully", receiptId: receipt._id });
  } catch (err) {
      res.status(500).json({ error: "Couldn't accept request" });
  }
});



exports.rejectRequest = catchAsync(async (req, res) => {
  const { requestId } = req.body;
    try {
        const request = await Request.findByIdAndDelete(requestId);
        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }
        res.status(200).json({ message: "Request rejected successfully" });
    } catch (err) {
        res.status(500).json({ error: "Couldn't reject request" });
    }
});

exports.fetchRequest = catchAsync(async (req, res) => {
  const { userId } = req.body;
  try {
      const requests = await Request.find({
          listCreator: userId
      }).populate({
          path: 'list',
          populate: {
              path: 'creator',
              model: 'User'
          }
      }).populate('requester');
      res.status(200).json(requests);
  } catch (err) {
      res.status(500).json({ error: "Couldn't fetch requests" });
  }
});


exports.fetchReceipt = catchAsync(async (req, res) => {
  const { userId } = req.body;
    try {
        const receipts = await Receipt.find({ $or: [{ requester: userId }, { sharer: userId }] })
            .populate('list requester sharer');
        res.status(200).json(receipts);
    } catch (err) {
        res.status(500).json({ error: "Couldn't fetch receipts" });
    }
});