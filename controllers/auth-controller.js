const router = require('express').Router();
const passport = require('passport');
const shortid = require('shortid');
const middleware = require('./../config/middleware');
const User = require('../models/User');

module.exports = function(app) {

    router.get('/session', function(req, res){
        if(req.isAuthenticated()){
            res.json({user: req.user, isAuth: true})
        } else res.json({user: null, isAuth: false})
    })

    // sign-up new user
    router.post('/signup', function(req, res){
        let userData = {
            username: req.body.newUser.username,
            password: req.body.newUser.password,
            creatorId: shortid.generate()
        }

        let newUser = new User(userData);

        newUser.save(function(err, data) {

            if (err) {

                if (err.message.includes('duplicate')) {
                    res.statusCode = 500;
                    res.send({ title: 'Duplicate Username', message: 'Please choose another username. Try using your email address.' });
                } else if (err.errors.password) {
                    res.statusCode = 500;
                    res.send({ title: 'Insecure Password', message: err.errors.password.message });
                } else if (err.errors.username) {
                    res.statusCode = 500;
                    res.send({ title: 'Invalid Username', message: err.errors.username.message });
                } else {
                    res.statusCode = 400;
                    res.send({ title: 'Server Error', message: 'We could not process your request. Please check your data and your connection and try again.' })
                }
            } else {
                res.json(data);
            }
        });
    });

    //
    router.post('/login', passport.authenticate('local'), function(req, res) {
        if (req.user) {
            res.json(req.user)
        } else {
            res.statusCode = req.statusCode;
            res.send({ message: req.statusMessage });
        }

    });

    router.post('/logout', function(req, res) {
        req.logout();
        res.send({ message: 'Logged Out' });
    });

    app.use('/api', router);

}