const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load contacts model

require('../models/contact');
var Contact = mongoose.model('contacts');


//register form post
router.post('/', (req, res) => {
    let errors = [];

    if (req.body.phone.length < 10) {
        errors.push({
            text: 'error submitting form'
        });
    }
    if (errors.length > 0) {
        res.render('index', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });
    } else {
        Contact.findOne({
                email: req.body.email
            })
            .then(contact => {
                if (contact) {
                    req.flash('error_msg', 'email already sent');
                     res.redirect('/')
                } else {

                    const newContact = new Contact({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        message: req.body.message,
                    });
                    newContact.save()
                        .then(contact => {
                            req.flash('success_msg', 'Your message was succesfully sent');
                            res.redirect('/');
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        });
                }
            });

    }
});

module.exports = router;