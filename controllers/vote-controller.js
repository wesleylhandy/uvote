const router = require('express').Router();
const User = require('../models/User');

module.exports = function(app) {

    router.post('/poll/inputs/vote/:creatorId', function(req, res) {
        User.findOne({ creatorId: req.params.creatorId })
            .then(user => {
                var index = user.polls.indexOf({title: req.body.pollTitle});
                user.polls[index].inputs.id(req.body.optionId).votes.$inc();
                user.polls[index].inputs.id(req.body.optionId).voters.push(req.body.userId ? req.body.userId : 'anonymous');
                user.save(function(err) {
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