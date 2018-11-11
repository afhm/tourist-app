var LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// require('../models/admin'); 
var Admin = mongoose.model('admins');

module.exports = function (passport) {

    passport.use(new LocalStratergy({
        usernameField: 'email'
    }, (email, password, done) => {

        //match user
        Admin.findOne({
            email: email
        }).then(admin => {
            if (!admin) {
                return done(null, false, {
                    message: 'No admin found'
                });
            }
            //match password
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, admin);
                } else {
                    return done(null, false, {
                        message: 'Password incorrect'
                    });
                }
            });
        })
    }));

    passport.serializeUser(function (admin, done) {
        done(null, admin.id);
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });

}