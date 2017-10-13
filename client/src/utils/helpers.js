import axios from 'axios';

export function authUser(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', { user }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function unAuthUser(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/logout', { user }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export function newUser(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/signup', { user }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function getAllUsersPolls() {
    return new Promise((resolve, reject) => {
        axios.get('/api/polls/all/').then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function getAllMyPolls(creatorId, isAuth) {
    return new Promise((resolve, reject) => {
        if (isAuth) {
            axios.get(`/api/polls/byUser/all/${creatorId}`).then(response => {
                resolve(response.data);
            }).catch(err => {
                if (err) reject(err.response.data);
                else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
            });
        } else {
            reject({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
    });
}

export function getMyIncompletePolls(creatorId, isAuth) {
    return new Promise((resolve, reject) => {
        if (isAuth) {
            axios.get(`/api/polls/byUser/incomplete/${creatorId}`).then(response => {
                resolve(response.data);
            }).catch(err => {
                if (err) reject(err.response.data);
                else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
            });
        } else {
            reject({ title: "Unauthorized Request", message: 'You must be logged in to make changes to any poll data.' });
        }
    });
}

export function getAnotherUsersPolls(creatorId) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/polls/byUser/complete/${creatorId}`).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function getSinglePoll(id, title) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/polls/byUser/single/${id}/${title}`).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function createPoll(creatorId, title, isAuth) {
    return new Promise((resolve, reject) => {

        axios.post(`/api/polls/add/${creatorId}`, { title, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });

    })
}

export function addOption(creatorId, pollId, order, text, isAuth) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/polls/inputs/add/${creatorId}`, { pollId, order, text, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    })
}

export function savePoll(creatorId, pollId, isAuth) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/polls/complete/${creatorId}`, { pollId, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    })
}

export function changeOptionOrder(creatorId, pollId, options, isAuth) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/polls/inputs/reorder/${creatorId}`, { pollId, options, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    })
}


export function deleteOption(creatorId, pollId, optionId, isAuth) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/polls/inputs/delete/${creatorId}`, { pollId, optionId, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function deletePoll(pollId, creatorId, isAuth) {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/polls/delete/${creatorId}`, { pollId, isAuth }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function vote(pollId, creatorId, optionId) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/polls/inputs/vote/${creatorId}`, { pollId, optionId }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}