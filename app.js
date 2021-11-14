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
const session = require('express-session');
const methodOverride = require('method-override');


const Articles = require('./models/articles');
const Admin = require('./models/admin');
const { passportSerialize, passportDeserialize, passportMiddleware } = require('./passport-config.js');

mongoConnect.main();

app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

app.use(methodOverride('_method'));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passportSerialize;
passportDeserialize;
passportMiddleware;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}
function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/new_article');
}

app.get('/', (req, res, next) => {
    res.render('home', {title: 'Home'});
});

app.get('/about', (req, res, next) => {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req, res, next) => {
    res.render('contact', {title: 'Contact'});
});

app.get('/articles', async (req, res, next) => {
    try {
        const articles = (await Articles.find()).reverse();
        res.render('articles', { title: 'Articles', articles });
    } catch(e) {
        console.log(e);
    }

});

app.get('/new_article', (req, res, next) => {
    res.render('./admin/newpost', {title: 'New Article'});
});

app.get('/login', isLoggedOut, (req, res, next) => {
    const response = {
        title: 'Login',
        error: req.query.error
    }

    res.render('./login', { title: 'Log In', response });
});

app.get('/signup', (req, res, next) => {
    res.render('./signup', {title: 'Sign Up'});
});

// app.get('/setup', async (req, res, next) {
//     const exists = await Admin.exists({ email: 'admin@gmail.com'});

//     if(exists) {
//         console.log("EXISTS");
//         res.redirect('/login');
//         return;
//     }

//     bcrypt.genSalt(10, function(err, salt) {
//         if(err) return next(err);
//         bcrypt.hash('pass', salt, function(err, hash){
//             if(err) return next(err);

//             const newAdmin = new Admin({
//                 _id: uuidv4(),
//                 email: 'admin@gmail.com',
//                 password: hash
//             });
            
//             newAdmin.save();
//             res.redirect('/login');
//         })
//     });
// });

app.get('/logout', async (req, res, next) => {
    await req.logout();
    res.redirect('/');
})

app.get('/articles/:id', async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const article = await Articles.findById(id);
        res.render('article', { title: 'Article', article } );
    } catch (e) {
        console.log(e);
    }
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true',
        failureFlash: true
}));

app.post('/signup', async(res, req, next) => {
    try {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(req.body.password, salt, function(err, hash){
                if(err) return next(err);
    
                const newAdmin = new Admin({
                    _id: uuidv4(),
                    email: req.body.email,
                    password: hash
                });
                
                newAdmin.save();
                res.redirect('/login');
            })
        });
        console.log(req.body)
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const User = new Admin({
        //     _id: uuidv4(),
        //     email: req.body.email,
        //     password: hashedPassword
        // })
    
        // await User.save();
        
        
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

    console.log(req.body);
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