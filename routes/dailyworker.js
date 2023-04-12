const express = require('express')
const router = express.Router()

const Worker = require('../models/worker')
const Leave = require('../models/leave');
const { isCareTaker } = require('../middleware');

router.get('/add', isCareTaker, async (req, res) => { 
    return res.render('dailyworker/add');
 });

router.post('/add', isCareTaker, async (req, res) => {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    return res.redirect('/dw/add');
})

router.get('/getall', isCareTaker, async (req, res) => {
    const allworkers = await Worker.find();
    return res.render('dailyworker/all', { allworkers });
})

module.exports = router
