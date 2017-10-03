const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.post('/poll/inputs/vote/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                user.polls.id(req.body.pollId).inputs.id(req.body.optionId).votes++;
                user.save(function(err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json({ poll: user.polls.id(req.body.pollId).inputs.id(req.body.optionId) });
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    app.use('/api', router);

}