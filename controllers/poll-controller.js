const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.get('/polls/byUser/complete/:creatorId', function(req, res) {
        User.findOne({
                creatorId: req.params.creatorId
            })
            .then(user => {
                var completedPolls = user.polls.filter(function(poll) {
                    return poll.status == 'complete'
                });
                res.json({ polls: completedPolls });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/incomplete/:creatorId', function(req, res) {
        User.findOne({
                creatorId: req.params.creatorId
            })
            .then(user => {
                var completedPolls = user.polls.filter(function(poll) {
                    return poll.status == 'incomplete'
                });
                res.json(completedPolls);
            })
            .then(user => res.json({ polls: user.polls }))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/all/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => res.json(polls { user.polls }))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/single/:creatorId/:pollId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                res.json({ poll: user.polls.id(req.params.pollId) });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/all/', function(req, res) {
        User.aggregate({
                $project: {
                    _id: 0,
                    username: 0,
                    password: 0,
                    creatorId: 1,
                    polls: 1
                },
                { $unwind: '$polls' },
                {
                    $match: {
                        'polls.status': 'complete'
                    }
                }
            },
            function(err, polls) {
                if (err) {
                    res.statusCode = 500;
                    return res.json({ title: 'Error', message: err });
                }
                res.json({ polls });
            }
        );
    });

    router.post('/polls/add/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        let data = {
            title: req.body.title,
            url: req.params.creatorId + '/' + encodeURIComponent(req.body.title),
        }

        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var index = user.polls.indexOf({ title: data.title });
                if (index >= 0) {
                    res.statusCode = 409;
                    res.send({ title: 'Error', message: 'Please choose a different title.' })
                } else {
                    user.polls.push(data);
                    user.save(function(err) {
                        if (err) {
                            res.statusCode = 500;
                            return res.json({ title: 'Error', message: err });
                        }
                        console.log('Success!');
                        res.json({ polls: user.polls });
                    });
                }
            }).catch(err => {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            });
    });

    router.post('/polls/inputs/add/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        let data = {
            title = req.body.text,
            order = req.body.order,
        }

        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var index = user.polls.id(data.pollId).inputs.indexOf({ title: data.title });
                if (index >= 0) {
                    res.statusCode = 409;
                    res.send({ title: 'Error', message: 'Duplicate Entry Error.' });
                } else {
                    user.polls.id(pollId).inputs.push(data);
                    user.save(function(err) {
                        if (err) {
                            res.statusCode = 500;
                            return res.json({ title: 'Error', message: err });
                        }
                        console.log('Success!');
                        res.json({ inputs: user.polls.id(pollId).inputs });
                    });
                }
            }).catch(err => {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            });;
    });

    router.put('/polls/complete/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        User.findOne({ _id: req.params.creatorId })
            .then(user => {
                user.polls.id(req.body.pollId).status = 'complete';
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json({ poll: user.polls.id(req.body.pollId) });
                });
            }).catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
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

    router.delete('/inputs/delete/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }

        User.findOne({ _id: req.params.creatorId })
            .then(user => {
                user.polls.id(req.body.pollId).inputs.pull(req.body.optionId);
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json(user);
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.delete('/polls/delete/:creatorId', function(req, res) {
        let isAuth = req.body.isAuth;

        if (isAuth == false) {
            res.statusCode = 401;
            return res.json({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
        User.findOne({ _id: req.params.creatorId })
            .then(user => {
                user.polls.pull(req.body.pollId);
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json(user);
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    app.use('/api', router);

}