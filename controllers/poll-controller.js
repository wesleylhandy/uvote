const router = require('express').Router();
const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = function(app) {

        router.post('/newPoll', function(req, res) {
                    let pollData = {
                        title: req.body.title,
                        url: req.body.creatorId + '/' + encodeURIComponent(req.body.title),
                        createdBy: req.body.creatorId
                    }

                    let newPoll = new Poll(pollData);

                    newPoll.save(function(err, data) {

                            if (err) {
                                res.statusCode = 500;
                                res.send({ title: 'Please choose a different title.' })
                            })


                        app.use('/api', router);

                    }