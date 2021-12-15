require('dotenv').config()

const express = require('express');
const ejs = require('ejs-mate');
const path = require('path');
const mongoConnect = require('./db/mongoose');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { auth, requiresAuth } = require('express-openid-connect');
const methodOverride = require('method-override');
const Articles = require('./models/articles');
const Admin = require('./models/admin');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };
  

mongoConnect.main();

app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(auth(config));




app.get('/', async (req, res, next) => {
    try {
        const articles = (await Articles.find()).reverse();
        res.render('home', { title: 'Home', isAuth: req.oidc.isAuthenticated() ,articles });
    } catch(e) {
        console.log(e);
    }
});

app.get('/about', (req, res, next) => {
    res.render('about', {title: 'About', isAuth: req.oidc.isAuthenticated()});
});

app.get('/contact', (req, res, next) => {
    res.render('contact', {title: 'Contact', isAuth: req.oidc.isAuthenticated()});
});

app.get('/articles', async (req, res, next) => {
    try {
        console.log(req.oidc.isAuthenticated());
        const articles = (await Articles.find()).reverse();
        res.render('articles', { title: 'Articles', isAuth: req.oidc.isAuthenticated(), articles });
    } catch(e) {
        console.log(e);
    }

});

app.get('/new_article', requiresAuth(), (req, res, next) => {
    res.render('./admin/newpost', {title: 'New Article', isAuth: req.oidc.isAuthenticated()});
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
})

app.get('/edit/:id', requiresAuth(), async(req, res) => {
    try {
        const { id } = req.params;
        const article = await Articles.findById(id);
        res.render('admin/editpost', {title: 'Edit Post', article , isAuth: req.oidc.isAuthenticated()});
    } catch(e) {
        console.log(e);
    }
});

app.delete('/articles/:id', requiresAuth(), async (req, res) => {
    try {
        const { id } = req.params;
        await Articles.findByIdAndDelete(id);
        res.redirect('/articles');
    } catch(e) {
        console.log(e)
    }

});

app.patch('/edit/:id', requiresAuth(), async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Articles.findByIdAndUpdate(id, {...req.body});
        await article.save();
        res.redirect('/articles');
    } catch(e) {
        console.log(e); 
    }
});
 

app.get('/logout', requiresAuth(), async (req, res) => {
    await req.logout();
    res.redirect('/');
})

app.get('/articles/:id', async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const article = await Articles.findById(id);
        res.render('article', { title: 'Article', isAuth: req.oidc.isAuthenticated(), article } );
    } catch (e) {
        console.log(e);
    }
});

app.post('/post-article', requiresAuth(), async (req,res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var dateFinal = mm + '/' + dd + '/' + yyyy;


    const Data = new Articles({
        _id: uuidv4(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date: dateFinal
    })

    await Data.save();
    res.redirect('/articles');
});


app.listen(process.env.PORT || 8000, () => {
    try {
        console.log('listening to port 8000!');
    } catch (e) {
        console.log(e);
    }
});