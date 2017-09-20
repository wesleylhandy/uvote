const router = require('express').Router();
const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = function(app) {
    app.use('/api', router);

}