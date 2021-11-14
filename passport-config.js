const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Admin = require('./models/admin');


module.exports.passportSerialize = passport.serializeUser(function (user, done) {
    done(null, user.id);
});

module.exports.passportDeserialize = passport.deserializeUser(function (id, done) {
    Admin.findById(id, function(err, user) {
        done(err, user);
    })
});

module.exports.passportMiddleware = passport.use(new localStrategy(function (email, password, done) {
    Admin.findOne( { email: email }, function(err,user) {
        if (err) return done(err);
        if (!user) return done(null, false, {message: "Incorrect Email"});
        

        bcrypt.compare(password, user.password, function(err, res){
            if (err) return done(err);
            if (res === false) return done(null, false, {message: "Incorrect Password"});
            
        })
    });
}));

// function initialize(passport) {
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email);
//         if (user == null) {
//             return done(null, false, { message: 'No user with that email.'});
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: 'Password Incorrect'})
//             }
//         } catch(e) {
//             return done(e);
//         }
//     }

//     passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
//     passport.serializeUser((user,done) => { });
//     passport.deserializeUser((id, done) => { });
// }

// module.exports = initialize;