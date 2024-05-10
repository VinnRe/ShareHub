const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    listInfo: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfRequest: {
        type: String,
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
