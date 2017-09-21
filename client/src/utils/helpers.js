import axios from 'axios';

export function login(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', { user }).then(response => {
            resolve(response);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function logout(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/logout', { user }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
}

export function signup(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/signup', { user }).then(response => {
            resolve(response);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function getAllUsersPolls() {
    return new Promise((resolve, reject)=> {
        axios.get('/api/polls/all/').then(response=> {
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function getAllMyPolls(creatorId) {
    return new Promise((resolve, reject)=> {
        axios.get(`/api/polls/byUser/all/${creatorId}`).then(response=> {
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function getMyIncompletePolls(creatorId) {
    return new Promise((resolve, reject)=> {
        axios.get(`/api/polls/byUser/incomplete/${creatorId}`).then(response=> {
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function getAnotherUsersPolls(creatorId) {
    return new Promise((resolve, reject)=> {
        axios.get(`/api/polls/byUser/complete/${creatorId}`).then(response=> {
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function getSinglePoll(id) {
    return new Promise((resolve, reject)=> {
        axios.get(`/api/polls/byUser/single/${id}`).then(response=> {
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function createPoll(creatorId, title) {
    return new Promise((resolve, reject)=> {
        axios.post(`/api/polls/add/${creatorId}`, {title}).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    })
}

export function addOption(pollId, order, text) {
    return new Promise((resolve, reject)=> {
        axios.post(`/api/polls/inputs/add/${pollId}`, {order, text}).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    })
}

export function savePoll(pollId) {
    return new Promise((resolve, reject)=> {
        axios.put(`/api/polls/complete/${pollId}`).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    })
}

export function changeOptionOrder(pollId, text) {
    return new Promise((resolve, reject)=> {
        axios.put(`/api/polls/inputs/reorder/${pollId}`, {text}).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    })


export function deleteOption(pollId, text) {
    return new Promise((resolve, reject)=> {
        axios.put(`/api/polls/inputs/delete/${pollId}`, {text}).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}

export function deletePoll(pollId, text) {
    return new Promise((resolve, reject)=> {
        axios.delete(`/api/polls/delete/${pollId}`, {text}).then(response=>{
            resolve(response);
        }).catch(err=> {
            if (err) reject(err.response.data);
            else reject('Request Error');
        });
    });
}