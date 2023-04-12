const express=require('express')
const router=express.Router()
const Worker =require('../models/worker')
const leave=require('../models/leave')


router.get('/getAll',async(req,res)=>{
    if(req.user.isWarden===false && req.user.isCaretaker===false){
        return res.redirect('/');
    }
    try{
    const workers=await Worker.find().populate('leaves')
    console.log(workers)
    res.render('leave/all',{workers})
    }
    catch (err){
        console.log( err )
    }
})

router.get('/add', async (req, res) => {
    if (req.user.isWarden === false && req.user.isCaretaker === false) {
        return res.redirect('/');
    }
    return res.render('leave/addleave');
})

router.post('/addLeave', async (req, res) => {
    if (req.user.isWarden === false && req.user.isCaretaker === false) {
        return res.redirect('/');
    }
    const leaveDetails=req.body
    const newLeave=new leave({
        name:leaveDetails.name,
        date:leaveDetails.date,
    })
    
    await newLeave.save()
    
    const thisWorker = await Worker.findOne({ name: leaveDetails.name })
    console.log(thisWorker)
    
    thisWorker.leaves.push(newLeave._id)
    
    await thisWorker.save()
    console.log(req.body)
    res.redirect('/leave/getall');
})

// router.get('/getSalary', async(req,res)=>{
// //    const person=await Worker.findOne({name:req.body.name}).populate('leaves')
// //    console.log(person)
//     return res.send("salaries page");
// })




module.exports=router