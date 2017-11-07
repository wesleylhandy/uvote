'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSession = getSession;
exports.authUser = authUser;
exports.guestUser = guestUser;
exports.unAuthUser = unAuthUser;
exports.newUser = newUser;
exports.getAllUsersPolls = getAllUsersPolls;
exports.getAllMyPolls = getAllMyPolls;
exports.getMyIncompletePolls = getMyIncompletePolls;
exports.getUsersCompletePolls = getUsersCompletePolls;
exports.getSinglePoll = getSinglePoll;
exports.getUnsavedPoll = getUnsavedPoll;
exports.createPoll = createPoll;
exports.addTitle = addTitle;
exports.addOption = addOption;
exports.savePoll = savePoll;
exports.changeOptionOrder = changeOptionOrder;
exports.deleteOption = deleteOption;
exports.deletePoll = deletePoll;
exports.vote = vote;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSession() {
    return new Promise(function (resolve, reject) {
        _axios2.default.get('/api/session').then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function authUser(username, password) {
    return new Promise(function (resolve, reject) {
        _axios2.default.post('/api/login', { username: username, password: password }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function guestUser(guestName) {
    return new Promise(function (resolve, reject) {
        _axios2.default.post('/api/guestuser', { guestName: guestName }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function unAuthUser() {
    return new Promise(function (resolve, reject) {
        _axios2.default.post('/api/logout').then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function newUser(newUser) {
    return new Promise(function (resolve, reject) {
        _axios2.default.post('/api/signup', { newUser: newUser }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function getAllUsersPolls() {
    return new Promise(function (resolve, reject) {
        _axios2.default.get('/api/polls/all/').then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function getAllMyPolls(creatorId, isAuth) {
    return new Promise(function (resolve, reject) {
        if (isAuth) {
            _axios2.default.get('/api/polls/byUser/all/' + creatorId).then(function (response) {
                resolve(response.data);
            }).catch(function (err) {
                if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
            });
        } else {
            reject({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
    });
}

function getMyIncompletePolls(creatorId, isAuth) {
    return new Promise(function (resolve, reject) {
        if (isAuth) {
            _axios2.default.get('/api/polls/byUser/incomplete/' + creatorId).then(function (response) {
                resolve(response.data);
            }).catch(function (err) {
                if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
            });
        } else {
            reject({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
    });
}

function getUsersCompletePolls(creatorId) {
    return new Promise(function (resolve, reject) {
        _axios2.default.get('/api/polls/byUser/complete/' + creatorId).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function getSinglePoll(id, title) {
    return new Promise(function (resolve, reject) {
        _axios2.default.get('/api/polls/byUser/single/' + id + '/' + title).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function getUnsavedPoll(userId, pollId) {
    return new Promise(function (resolve, reject) {
        _axios2.default.get('/api/polls/byUser/byId/' + userId + '/' + pollId).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function createPoll(creatorId, isAuth) {
    return new Promise(function (resolve, reject) {

        _axios2.default.post('/api/polls/add/' + creatorId, { isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function addTitle(creatorId, pollId, title, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.put('/api/polls/title/add/' + creatorId, { pollId: pollId, title: title, isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function addOption(creatorId, pollId, option, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.post('/api/polls/inputs/add/' + creatorId, { pollId: pollId, option: option, isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function savePoll(creatorId, pollId, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.put('/api/polls/complete/' + creatorId, { pollId: pollId, isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

// change option order may be implemented in the future to allow rearranging of input order once input is saved
function changeOptionOrder(creatorId, pollId, options, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.put('/api/polls/inputs/reorder/' + creatorId, { pollId: pollId, options: options, isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function deleteOption(creatorId, pollId, optionId, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.delete('/api/polls/inputs/delete/' + pollId + '/' + optionId, { isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function deletePoll(pollId, creatorId, isAuth) {
    return new Promise(function (resolve, reject) {
        _axios2.default.delete('/api/polls/delete/' + pollId, { isAuth: isAuth }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

function vote(pollTitle, optionId, creatorId, userId) {
    return new Promise(function (resolve, reject) {
        _axios2.default.put('/api/polls/inputs/vote/' + creatorId, { pollTitle: pollTitle, optionId: optionId, userId: userId }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            if (err) reject(err.response.data);else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}