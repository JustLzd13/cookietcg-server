const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    imageNews: {
        type: String, // URL or filename of the image
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

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
