const catchAsync = require("./../utils/catchAsync");
const List = require("../model/listModel");
const User = require("../model/userModel");

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


exports.fetchAll = catchAsync(async (req, res) => {
    try {
      const allList = await List.find({}).sort({ createdAt: -1 });
      const result = [];
  
      for (let i = 0; i < allList.length; ++i) {
        const owner = await User.findById(allList[i].creator, { _id: 0, password: 0, email: 0 });
        result.push({ listData: allList[i], ownerInfo: owner });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Couldn't find list!! Please refresh and try again!!");
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
        const filteredResources = await Resource.find({ tags: { $in: tags } }).sort({ createdAt: -1 });

        const result = [];
        for (let i = 0; i < filteredResources.length; ++i) {
            const owner = await User.findById(filteredResources[i].creator, { _id: 0, password: 0, email: 0 });
            result.push({ resourceData: filteredResources[i], ownerInfo: owner });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json("Error occurred while filtering resources. Please try again!");
    }
});

exports.searchList = catchAsync(async (req, res) => {
  const { searchTerm } = req.body;
  try {
      let searchedList = await Listfind({ title: { $regex: new RegExp(searchTerm, 'i') } }).sort({ createdAt: -1 });
      if (searchedList.length === 0) {
          const user = await User.findOne({ name: { $regex: new RegExp(searchTerm, 'i') } });
          const userId = user._id;
          searchedList = await Listfind({ creator: userId }).sort({ createdAt: -1 });
      }

      const result = [];
      for (let i = 0; i < searchedList.length; ++i) {
          const owner = await User.findById(searchedList[i].creator, { _id: 0, password: 0, email: 0 });
          result.push({ Listata: searchedList[i], ownerInfo: owner });
      }
      res.status(200).json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json("Error occurred while searching for listing. Please try again!");
  }
});
