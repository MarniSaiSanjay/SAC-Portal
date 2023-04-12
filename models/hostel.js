const mongoose= require('mongoose')
const Schema= mongoose.Schema

const hostelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    funds:{
        type:Number,
        default:10000
    }
})

module.exports= mongoose.model('hostel',hostelSchema)