const express = require('express');
const passport = require('passport');
const router = express.Router();
const complaintController = require('../controllers/complaint');

router.route('/')
    .get(complaintController.getAll);

router.route('/add')
    .get(complaintController.addComplaint_get)
    .post(complaintController.addComplaint_post)

router.route('/:id')
    .get(complaintController.viewComplaint);

router.route('/:id/atr')
    .post(complaintController.submitATR);


module.exports = router;