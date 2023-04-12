const express=require('express')
const router=express.Router()

const User = require('../models/user');
const Hostel = require('../models/hostel')

router.get('/',async (req,res)=>{
    const hostels=await Hostel.find()
    return res.render('hostel/hostelList',{hostels})
})

router.get('/hostel',async(req,res)=>{
    return res.render('chairman/hostelAdd')
})

router.post('/hostel',async(req,res)=>{
        const newHostel= await new Hostel({
            name:req.body.name.toLowerCase()
        })
        await newHostel.save()
        res.redirect('/chairman')
})

router.get('/funds', async (req, res) => {
    return res.render('chairman/fundsAdd', { err: "" })
})

router.post('/funds',async(req,res)=>{
    console.log(req.body)
        const hostelDetails=req.body
        const currentHostel=await Hostel.findOne({name:hostelDetails.name})
        const addMoney=parseInt(hostelDetails.funds)
        if(addMoney>req.user.remFunds) return res.render('chairman/fundsAdd',{err:"insufficient funds"})
      
    currentHostel.funds += addMoney;
    const user = await User.findById(req.user.id);

    user.remFunds -= addMoney;
    await user.save();
        await currentHostel.save()
        const currentHostelupdated=await Hostel.findOne({name:hostelDetails.name})
        console.log(currentHostelupdated)
         res.redirect('/chairman')
})

// router.post('/hostel',async(req,res)=>{
//     const hostelDetails=req.body
//     const newHostel=new Hostel({
//         name:hostelDetails.name,
//         funds:hostelDetails.funds
//     })
//     await newHostel.save()
//     res.send('hello')
// })


module.exports=router