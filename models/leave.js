const mongoose=require('mongoose')
const Schema=mongoose.Schema

const leaveSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required:true
    }
})

module.exports=mongoose.model('leave',leaveSchema)