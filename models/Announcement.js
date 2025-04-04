const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    image: {
        type: String, // Image path or URL
        required: true
    },
    details: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
