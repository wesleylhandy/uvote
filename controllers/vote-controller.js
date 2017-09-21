const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.post('/poll/inputs/vote/:pollId', function(req, res) {
        Poll.findOne({ _id: req.params.pollId }).then(function(poll) {
            poll.addVotes(poll.inputs, req.body.order, function(err, success) {
                if (err) {
                    res.statusCode = 500;
                    res.json({ title: 'Error', message: err });
                }
            })
        })


    });

    app.use('/api', router);

}