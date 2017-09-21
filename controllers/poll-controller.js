const router = require('express').Router();
const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = function(app) {

    router.get('/polls/byUser/complete/:creatorId', function(req, res) {
        Poll.find({ createdBy: req.params.creatorId }).where('status', 'complete')
            .then(polls => res.json(polls))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/incomplete/:creatorId', function(req, res) {
        Poll.find({ createdBy: req.params.creatorId }).where('status', 'incomplete')
            .then(polls => res.json(polls))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/all/:creatorId', function(req, res) {
        Poll.find({ createdBy: req.params.creatorId })
            .then(polls => res.json(polls))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/byUser/single/:id', function(req, res) {
        Poll.findOne({_id: req.params.id})
            .then(poll => res.json(poll))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.get('/polls/all/', function(req, res) {
        Poll.find({ status: 'complete' })
            .then(polls => res.json(polls))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.post('/polls/add/:creatorId', function(req, res) {
        let pollData = {
            title: req.body.title,
            url: req.params.creatorId + '/' + encodeURIComponent(req.body.title),
            createdBy: req.params.creatorId
        }

        let newPoll = new Poll(pollData);

        newPoll.save(function(err, data) {

            if (err) {
                res.statusCode = 500;
                res.send({ title: 'Error', message: 'Please choose a different title.' })
            } else res.json(data);

        });
    });

    router.post('/polls/inputs/add/:pollId', function(req, res) {

        Poll.findOneAndUpdate({ _id: req.params.pollId }, {
                $addToSet: {
                    inputs: {
                        order: req.body.order,
                        votes: 0,
                        text: req.body.text
                    }
                }
            }, { new: true })
            .then(poll => res.json({ poll }))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
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

    router.put('/polls/inputs/reorder/:pollId', function(req, res) {
        Poll.findOneAndUpdate({ _id: req.params.pollId, 'inputs.text': req.body.text }, { 'inputs.order': req.body.order }, { new: true })
            .then(poll => res.json({ poll }))
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    router.put('/polls/inputs/delete/:pollId', function(req, res) {
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
                res.json({ message: "Success!" });
            }
        });
    });


    app.use('/api', router);

}