const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admNumber: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact:{
        type: Number,
        min: 1000000000,
        max: 9999999999,
        required: true
    },
    complaint: {
        type: String, 
        required: true
    },
    atr: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);
// One to many relationship -> one campground many reviews. So we store reference to reviews in campground.