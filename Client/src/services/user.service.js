import { authHeader } from '../helpers';
import * as request from './req.options'

const serverAddress = "http://localhost:5000";

export const userService = {
    login,
    logout,
    getAll,
    resetPass,
    newCustomer,
    newWorker,
    deleteWorker,
    getWorkers,
    rateWorker,
    getRatings,
    getWorker,
    updateUser,
    getCustomer

};

function login(id, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
    };
    return fetch(serverAddress + "/users/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        }).catch(err => {
            return Promise.reject(err);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    
}

function newCustomer(user) {
    const requestOptions = request.postRequest(user);
    return fetch(serverAddress + "/users/newCustomer", requestOptions).then(handleResponse)
    .then(message =>{
        return message;
    }).catch(err =>{
        return Promise.reject(err);
    });
}
function newWorker(user) {
    const requestOptions = request.postRequest(user);
    return fetch(serverAddress + "/users/newWorker", requestOptions).then(handleResponse)
    .then(message =>{
        return message;
    }).catch(err =>{
        return Promise.reject(err);
    });
}

function deleteWorker(userId) {
    const requestOptions = request.deleteRequest();
    return fetch(serverAddress + "/users/" + userId, requestOptions).then(handleResponse)
    .then(message => {
        return message;
    }).catch(err => {
        return Promise.reject(err);
    });
}

function rateWorker(ratings){
    const requestOptions = request.postRequest(ratings);
    return fetch(serverAddress + "/ratings/new" , requestOptions).then(handleResponse)
    .then(message => {
        return message;
    }).catch(err => {
        return Promise.reject(err);
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serverAddress + "/users", requestOptions).then(handleResponse);
}

function getWorkers() {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/users', requestOptions)
        .then(handleResponse)
        .then(workers => {
            return workers;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function resetPass(id, password , newPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password, newPassword })
    };
    return fetch(serverAddress + "/users/reset", requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        let data = text;
        try{
            data = JSON.parse(text);

        }catch(err){
            data = text;
            
        }
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = data || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}   
function getRatings() {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/ratings', requestOptions)
        .then(handleResponse)
        .then(ratings => {
            return ratings;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function getWorker(workerId) {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/users/' + workerId, requestOptions)
        .then(handleResponse)
        .then(worker => {
            return worker;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function updateUser(id, user) {
    const requestOptions = request.putRequest(user);
    return fetch(serverAddress + "/users/update/" + id , requestOptions).then(handleResponse)
    .then(message =>{
        let localUser = JSON.parse(localStorage.getItem('user'));
        localUser.firstName = user.firstName;
        localStorage.setItem('user', JSON.stringify(localUser));
        return message;
    }).catch(err =>{
        return Promise.reject(err);
    });
}
function getCustomer(customerId) {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/users/customer/' + customerId, requestOptions)
        .then(handleResponse)
        .then(customer => {
            return customer;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}


