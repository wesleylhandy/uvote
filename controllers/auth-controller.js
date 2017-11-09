const router = require('express').Router();
const passport = require('passport');
const shortid = require('shortid');
const middleware = require('./../config/middleware');
const User = require('../models/User');

module.exports = function(app) {

    router.get('/session', function(req, res) {
        if (process.env.NODE_ENV !== 'production') {
            //log of session data retrieved from request for setting state
            console.log('----------/api/session----------');
            console.log({ authenticated: req.isAuthenticated() });
            console.log({ user: req.user });
            console.log({ guest: req.session.guest });
            console.log({ guestUser: req.session.username });
            console.log('--------------------------------');
        }

        if (req.isAuthenticated()) {
            res.json({ user: req.user, isAuth: true })
        } else res.json({ user: req.session.username, isAuth: false })
    })

    // sign-up new user
    router.post('/signup', function(req, res) {
        let userData = {
            username: req.body.newUser.username,
            password: req.body.newUser.password,
            creatorId: shortid.generate()
        }

        let newUser = new User(userData);

        newUser.save(function(err, data) {

            if (err) {
                console.error(JSON.stringify(err, null, 2))
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
                req.user = userData.creatorId;
                req.session.guest = false;
                req.session.save();
                res.json(data);
            }
        });
    });

    //create store for unauthorized user
    router.post('/guestuser', function(req, res) {
        let unAuthedUser = new User({
            username: req.body.guestName,
            password: 'P@ssw0rd!',
            creatorId: req.body.guestName
        });

        unAuthedUser.save(function(err, data) {
            if (err) {
                console.error(JSON.stringify(err, null, 2))
                res.statusCode = 400;
                res.send({ title: 'Server Error', message: 'We could not process your request. Please check your data and your connection and try again.' });
            } else {
                req.user = req.body.guestName;
                req.session.username = req.body.guestName;
                req.session.guest = true;
                req.session.save();
                res.json(data);
            }
        });
    });

    //
    router.post('/login', passport.authenticate('local'), function(req, res) {
        if (req.user) {
            req.session.guest = false;
            req.session.save();
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