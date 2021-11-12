if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const ejs = require('ejs-mate');
const path = require('path');
const mongoConnect = require('./db/mongoose');
const app = express();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session')

const initializePassport = require('./passport-config.js');
initializePassport(
    passport,
    email => users.find(user => user.email === email)
);

const Articles = require('./models/articles');
const Admin = require('./models/admin')

mongoConnect.main();

app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/contact', (req, res, next) => {
    res.render('contact');
});

app.get('/articles', async (req, res, next) => {
    try {
        const articles = (await Articles.find()).reverse();
        res.render('articles', { articles });
    } catch(e) {
        console.log(e);
    }

});

app.get('/new_article', (req, res, next) => {
    res.render('./admin/newpost');
});

app.get('/login', (req, res, next) => {
    res.render('./login');
});

app.get('/signup', (req, res, next) => {
    res.render('./signup');
});

app.get('/articles/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Articles.findById({ 
            _id: id
         });
        res.render('article', { article } );
    } catch (e) {
        console.log(e);
    }
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
}));

app.post('/signup', async(res, req, next) => {
    try {
        const User = new Admin({
            _id: uuidv4(),
            email: req.body.email,
            password: req.body.password
        })
    
        await User.save();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
    } catch(e) {
        console.log(e);
    }   
});

app.post('/post-article', async (req,res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var dateFinal = mm + '/' + dd + '/' + yyyy;


    const Data = new Articles({
        _id: uuidv4(),
        author: req.body.author,
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        content: req.body.content,
        date: dateFinal
    })

    await Data.save();
    res.redirect('/articles');
});


app.listen(8000, () => {
    try {
        console.log('listening to port 8000!');
    } catch (e) {
        console.log(e);
    }
});