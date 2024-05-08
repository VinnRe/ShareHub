const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    listInfo: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    listCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    dateOfRequest: {
        type: Date,
        default: Date.now
    }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
