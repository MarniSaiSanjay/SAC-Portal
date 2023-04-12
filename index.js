const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const dburl = 'mongodb://localhost:27017/sac1';
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(dburl, {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


// session
const session = require('express-session');
const secret = 'asecrethere';
const store = new MongoStore({
    mongoUrl: dburl,
    secret: secret,
    touchAfter: 24 * 3600
})
store.on("error", function (e) {
    console.log("Session store error!!!", e);
})

const sessionConfiguration = {
    store: store, 
    name: 'SAC', 
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}
app.use(session(sessionConfiguration));

// auth
const passport = require('passport');
const LocalStrategy = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());


const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const { isLoggedIn, isMessIncharge } = require('./middleware');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash('error');
    // res.locals.success = req.flash('success');
    next();
})

app.get('/', (req, res) => {
    return res.redirect('/home');
})
app.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
})

app.get('/dues', isLoggedIn, async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    console.log(currentUser);
    const dues = currentUser.messDues;

    if (currentUser.isStudent) return res.render('dues/student', { dues });
    if (currentUser.isMessIncharge) return res.render('dues/messIncharge');
    return res.redirect('/');
})

app.post('/dues', isLoggedIn, isMessIncharge, async (req, res) => {
    const { admNumber, due, month } = req.body;
    
    const student = await User.findOne({ admNumber });
    console.log(student);
    student.messDues.push({ month, due });
    await student.save();
    return res.redirect('/dues');
})

app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log(user);

    if (user.isStudent) return res.render('profiles/student', {user});
    return res.redirect('/');
})

app.get('/checkdues', isLoggedIn, isMessIncharge, async (req, res) => {
    const users = await User.find({});
    return res.render('dues/pendingDues', { users });
})

app.use('/users', require('./routes/auth'));
app.use('/complaint', isLoggedIn, require('./routes/complaint'));
app.use('/chairman', isLoggedIn, require('./routes/chairman'));
app.use('/leave', require('./routes/leave'));
app.use('/dw', require('./routes/dailyworker'));

app.use("*", (req, res) => {
    res.send("page not found");
})

app.listen(3000);