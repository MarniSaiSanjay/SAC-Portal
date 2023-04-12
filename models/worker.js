const mongoose=require('mongoose')
const Schema=mongoose.Schema
const leave=require('./leave')

const workerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    leaves:[
        {
            type:mongoose.Schema.Types.ObjectId,
            'ref':'leave',
        }
    ]
})
 module.exports=mongoose.model('Worker',workerSchema)