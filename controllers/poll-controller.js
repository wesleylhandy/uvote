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
            res.json(completedPolls);
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
        .then(user => res.json(user.polls))
        .catch(err => {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        });
});

router.get('/polls/byUser/all/:creatorId', function(req, res) {
    User.findOne({ creatorId: req.params.creatorId })
        .then(user => res.json(user.polls))
        .catch(err => {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        });
});

router.get('/polls/byUser/single/:creatorId/:pollId', function(req, res) {
    User.findOne({ creatorId: req.params.creatorId })
        .then(user => {
            res.json(user.polls.id(req.params.pollId))
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
            res.json(polls);
        }
    );
});

router.post('/polls/add/:creatorId', function(req, res) {
    let pollData = {
        title: req.body.title,
        url: req.params.creatorId + '/' + encodeURIComponent(req.body.title),
    }

    User.find


    if (err) {
        res.statusCode = 500;
        res.send({ title: 'Error', message: 'Please choose a different title.' })
    } else {
        User.findOneAndUpdate({ creatorId: createdBy }, {
                $addToSet: {
                    polls: {
                        data
                    }
                }
            }, { new: true })
            .then(user => res.json({ poll: data, user }))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    }

});
});

router.post('/polls/inputs/add/:pollId', function(req, res) {
    let inputData = {
        text: req.body.text,
        order: req.body.order,
        pollId: req.params.pollId
    }

    let newOption = new Option(inputData);

    newOption.save(function(err, data) {
        if (err) {
            res.statusCode = 500;
            res.send({ title: 'Error', message: 'Please choose a different title.' })
        } else {
            Poll.findOneAndUpdate({ _id: req.params.pollId }, {
                    $addToSet: {
                        inputs: {
                            data
                        }
                    }
                }, { new: true })
                .then(poll => res.json({ input: data, poll }))
                .catch(err => {
                    res.statusCode = 500;
                    res.json({ title: 'Error', message: err });
                });
        }
    });
});

router.put('/polls/complete/:pollId', function(req, res) {
    Poll.findOneAndUpdate({ _id: req.params.pollId }, { status: 'complete' })
        .then(poll => res.json({ poll }))
        .catch(err => {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        });
});

router.put('/inputs/reorder/:inputId', function(req, res) {
    Option.findOneAndUpdate({ _id: req.params.inputId }, { order: req.body.order } { new: true })
        .then(option => {
            Poll.findOneAndUpdate({ _id: option.pollId }, {})
            res.json({ poll })
        })
        .catch(err => {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        });
});

router.delete('/inputs/delete/:inputId', function(req, res) {
    Poll.findOneAndUpdate({ _id: req.params.pollId }, { $pull: { 'inputs': { 'text': req.body.text } } }, { new: true })
        .then(poll => res.json({ poll }))
        .catch(err => {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        });
});

router.delete('/polls/delete/:pollId', function(req, res) {
    Poll.remove({ _id: req.params.pollId }, function(err) {
        if (err) {
            res.statusCode = 500;
            res.json({ title: 'Error', message: err });
        } else {
            User.findOneAndUpdate({ creatorId: req.body.createdBy }, { $pull: { 'polls': { '_id': req.params.pollId } } }, { new: true })
                .then(user => res.json({ message: "Success!", user }))
                .catch(err => {
                    res.statusCode = 500;
                    res.json({ title: 'Error', message: err });
                })
        }

    });
});

app.use('/api', router);

}