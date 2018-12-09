const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//load admin model

require('../models/admin');
var Admin = mongoose.model('admins');


// admin login route
router.get('/login', (req, res) => {
  res.render('admin/login');
});



// admin register route
router.get('/register', (req, res) => {
  res.render('admin/register');
});

//login form post
router.post('/login', (req, res, next ) => {
 passport.authenticate('local', {
   successRedirect:'/places',
   failureRedirect:'/admin/login',
   failureFlash: true
 })(req,res,next);
});

//register form post
router.post('/register', (req, res) => {
  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({
      text: 'passwords do not match'
    });
  }
  if (req.body.password.length < 4) {
    errors.push({
      text: 'passwords must be 4 chars or more'
    });
  }
  if (errors.length > 0) {
    res.render('admin/register', {
      errors: errors,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    });
  } else {
    Admin.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'email already registered');
          res.redirect('/admin/login');
        } else {

          const newAdmin = new Admin({
            email: req.body.email,
            password: req.body.password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin.save()
                .then(admin => {
                  req.flash('success_msg', 'admin is now registered and can log in');
                  res.redirect('/admin/register');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });

        }
      });

  }
});

//logout user

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg','You are logged out');
   res.redirect('/admin/login');
});

module.exports = router;