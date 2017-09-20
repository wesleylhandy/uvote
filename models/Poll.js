const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    inputs: [Schema.Types.Mixed],
    status: {
        type: String,
        default: 'incomplete'
    }
});

PollSchema.method('updatepoll', function(pollId, input, cb) {

});

PollSchema.method('compareId', function(userId, createById, cb) {

});

module.exports = mongoose.model('Poll', PollSchema);