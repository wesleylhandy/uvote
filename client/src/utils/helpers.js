import axios from 'axios';

export function login(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', { user }).then(response => {
            if (response) resolve(response);
        }).catch(err => {
            if (err) reject(err.response.data);
        });
    });
}

export function logout(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/logout', { user }).then(response => {
            if (response) resolve(response);
        }).catch(err => {
            if (err) reject(err);
        });
    });
}

export function signup(user) {
    return new Promise((resolve, reject) => {
        axios.post('/api/signup', { user }).then(response => {
            if (response) resolve(response);
        }).catch(err => {
            if (err) reject(err.response.data);
        });
    });
}