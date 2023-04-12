const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Complaint = require('./complaint');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isWarden: {
        type: Boolean,
        default: false
    },
    complaints: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Complaint'
        }
    ],

    messDues: [{
        due: { type: Number },
        month: { type: String }
    }],
    isStudent: {
        type: Boolean,
        default: true
    },
    admNumber: {
        type: String,
        default: ""
    },
    isCareTaker: {
        type: Boolean,
        default: false
    },
    isSACChairman: {
        type: Boolean,
        default: false
    },
    isMessIncharge: {
        type: Boolean,
        default: false
    },
    remFunds: {
        type: Number,
        default: 0
    },
    contact: {
        type: Number,
        min: 1000000000,
        max: 9999999999,
        default: 1111111111
    },
    branch: {
        type: String,
        default: ""
    },
    course: {
        type: String,
        default: ""
    },
    hostel: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        default: ""
    }


});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);