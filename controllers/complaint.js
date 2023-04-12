const Complaint = require('../models/complaint');
const User = require('../models/user');

module.exports.getAll = async(req, res) => {
    var complaints = [];
    
    if (req.user.isWarden) {
        complaints = await Complaint.find();

        complaints.sort(function (a, b) { return (a.atr.length > b.atr.length) ? 1 : ((b.atr.length > a.atr.length) ? -1 : 0); });
        return res.render('complaint/all', { complaints });
    }
    else if(req.user.isStudent) {
        const modified_user = await User.findById(req.user.id).populate('complaints');
        complaints = modified_user.complaints;
        return res.render('complaint/all', { complaints });
    }
    return res.redirect('/');
}

module.exports.addComplaint_get = (req, res) => {
    return res.render('complaint/add');
};

module.exports.addComplaint_post =  async(req, res) => {
    const complaint = new Complaint(req.body);
    const currUser = await User.findById(req.user.id);
    currUser.complaints.push(complaint.id);
    await currUser.save();
    await complaint.save();
    res.redirect('/complaint');
};

module.exports.viewComplaint = async (req, res) => {
    const currComplaint = await Complaint.findById(req.params.id);
    return res.render('complaint/view', { currComplaint });
}

module.exports.submitATR = async (req, res) => {
    const currComplaint = await Complaint.findById(req.params.id);
    currComplaint.atr = req.body.atr;
    await currComplaint.save();
    return res.redirect('/complaint');
}
