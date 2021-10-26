const express = require('express');
const ejs = require('ejs-mate');
const path = require('path');
const mongoConnect = require('./db/mongoose');
const app = express();

const Articles = require('./models/articles');

mongoConnect.main();

app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());



app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/contact', (req, res, next) => {
    res.render('contact');
});

app.get('/articles', (req, res, next) => {
    res.render('articles');
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

app.post('/post-article', async (req,res) => {
    const Data = new Articles({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
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