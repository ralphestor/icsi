const express = require('express');
const ejs = require('ejs-mate');
const path = require('path');

const app = express();

app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/admission', (req, res, next) => {
    res.render('admission');
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


app.listen(8000, () => {
    try {
        console.log('listening to port 8000!');
    } catch (e) {
        console.log(e);
    }
});