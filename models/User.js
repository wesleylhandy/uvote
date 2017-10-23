const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const saltFactor = 10;
const Schema = mongoose.Schema;

// defining three schemas, Option will be child or Poll, Poll will be child of User - to create nesting of documents. Better for data manipulation and aggregation.
const InputSchema = new Schema({
    order: {
        type: Number,
        default: 0
    },
    title: String,
    votes: {
        type: Number,
        default: 0
    }
});

const PollSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    url: String,
    inputs: [InputSchema],
    status: {
        type: String,
        default: 'incomplete'
    },
    voters: [String]
});
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(v);
            },
            message: 'Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).'
        }
    },
    creatorId: {
        type: String,
        required: true
    },
    polls: [PollSchema]
});

UserSchema.plugin(passportLocalMongoose);

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltFactor, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

UserSchema.method('comparePassword', function(candidatePassword, dbPassword, cb) {
    bcrypt.compare(candidatePassword, dbPassword, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
});


module.exports = mongoose.model('User', UserSchema);