const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.put('/polls/inputs/vote/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                let filtered = user.polls.filter(function (poll) {
                    return poll.title === decodeURIComponent(req.body.pollTitle);
                });

                let _id = filtered[0]._id;
                let poll = user.polls.id(_id);
                let input = poll.inputs.id(req.body.optionId);
                
                input.votes++;
                input.voters.push(req.body.userId ? req.body.userId : 'anonymous');
                console.log({input});

                user.markModified('inputs');

                user.save(function(err, data) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json({ title: 'Error', message: err });
                    }
                    console.log('Success!');
                    res.json({message: 'success'});
                });

            })
            .catch(err => {
                res.statusCode = 500;
                res.json({ title: 'Error', message: err });
            });
    });

    app.use('/api', router);

}