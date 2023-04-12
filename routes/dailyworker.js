const express = require('express')
const router = express.Router()

const Worker = require('../models/worker')
const Leave = require('../models/leave')

router.get('/add', async (req, res) => { 
    return res.render('dailyworker/add');
 });

router.post('/add', async (req, res) => {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    return res.redirect('/dw/add');
})

router.get('/getall', async (req, res) => {
    const allworkers = await Worker.find();
    return res.render('dailyworker/all', { allworkers });
})

module.exports = router
