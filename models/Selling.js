const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productImage: {
        type: String, // URL or image filename
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
});

const Selling = mongoose.model('Selling', sellingSchema);

module.exports = Selling;
