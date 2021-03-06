const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.get('/polls/byUser/complete/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var completedPolls = user.polls.filter(function(poll) {
                    return poll.status == 'complete'
                });
                res.json({ polls: completedPolls.reverse() });
            }).catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/incomplete/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var incompletePolls = user.polls.filter(function(poll) {
                    return poll.status == 'incomplete'
                });
                res.json({ polls: incompletePolls });
            }).catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/all/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                const polls = user.polls;
                console.log(polls);
                res.json({ polls })
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/byId/:creatorId/:pollId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var poll = user.polls.id(req.params.pollId);
                res.json({ poll });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    })

    router.get('/polls/byUser/single/:creatorId/:title', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var filtered = user.polls.filter(function(poll) {
                    return poll.title === req.params.title;
                });
                var poll = filtered[0];
                res.json({ poll });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/all/', function(req, res) {
        User.aggregate([{
                $match: {
                    polls: {
                        $ne: []
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    polls: {
                        $filter: {
                            input: '$polls',
                            as: 'poll',
                            cond: {
                                $ne: ["$$poll.status", 'incomplete']
                            }
                        }
                    }
                }
            }, {
                $unwind: '$polls'
            }],
            function(err, polls) {
                if (err) {
                    res.statusCode = 500;
                    return res.json({ title: 'Error', message: err });
                }
                res.json({ polls: polls.reverse() });
            }
        );
    });

    router.post('/polls/add/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to create a new poll.' });
        }

        // let data = {
        //     title: req.body.title,
        //     url: '/polls/single/' + req.params.creatorId + '/' + encodeURIComponent(req.body.title),
        // }

        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                const poll = user.polls.create({});
                user.polls.push(poll);
                user.save(function(err, data) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json({ poll: poll });
                });
            }).catch(err => {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            });
    });

    router.put('/polls/title/add/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to create a new poll.' });
        }

        let title = req.body.title,
            url = '/polls/single/' + req.params.creatorId + '/' + encodeURIComponent(req.body.title);

        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                const index = user.polls.indexOf({ title: title });
                if (index >= 0) {
                    res.statusCode = 409;
                    res.send({ title: 'Error', message: 'Poll Titles Must Be Unique.' });
                } else {
                    const poll = user.polls.id(req.body.pollId);
                    poll.title = title;
                    poll.url = url;
                    poll.voters = [];
                    user.markModified('polls');
                    user.save(function(err, data) {
                        if (err) {
                            res.statusCode = 500;
                            return res.json({ title: 'Error', message: err });
                        }
                        console.log('Success!');
                        res.json({ poll: data.polls.id(req.body.pollId) });
                    });
                }
            })
            .catch(err => {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            });
    })

    router.post('/polls/inputs/add/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        let title = req.body.option.title,
            order = req.body.option.order;


        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                const input = { order, title };
                user.polls.id(req.body.pollId).inputs.push(input);
                user.markModified('polls');
                user.save(function(err, data) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Save Error', message: err });
                    }
                    console.log('Success!');
                    res.json({ input: input });
                });
            }).catch(err => {
                res.statusCode = 500;
                return res.json({ title: 'DB Error', message: err });
            });;
    });

    router.put('/polls/complete/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                const poll = user.polls.id(req.body.pollId);
                poll.status = 'complete';
                user.markModified('polls');
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Save Error', message: err });
                    }
                    console.log('Success!');
                    res.json({ poll: user.polls.id(req.body.pollId) });
                });
            }).catch(err => {
                res.statusCode = 500;
                res.json({ title: 'DB Error', message: err });
            });
    });

    router.put('/inputs/reorder/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        User.findOne({ _id: req.params.creatorId })
            .then(user => {
                var inputs = user.polls.id(req.body.pollId).inputs;
                req.body.options.forEach(option => {
                    inputs.id(options.id).order = option.order;
                });
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json({
                        inputs: user.polls.id(req.body.pollId).inputs
                    });
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.delete('/polls/inputs/delete/:pollId/:optionId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        User.update({ "polls._id": req.params.pollId, "polls.inputs._id": req.params.optionId }, {
            "$pull": {
                "polls.$.inputs": { "_id": req.params.optionId }
            }
        }, function(err, data) {
            if (err) {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            }
            res.json(data);
        });

    });


    router.delete('/polls/delete/:pollId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
        User.update({ "polls._id": req.params.pollId }, {
            "$pull": {
                "polls": { "_id": req.params.pollId }
            }
        }, function(err, data) {
            if (err) {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            }
            res.json(data);
        });

    });

    app.use('/api', router);

}