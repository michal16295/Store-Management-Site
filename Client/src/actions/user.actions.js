import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
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
    getCustomer,
    getSalary,
    getCustomers,
    getReferralsCustomers,

};

function login(id, password) {
    return dispatch => {
        dispatch(request({ id }));

        userService.login(id, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function newCustomer(user) {
    return dispatch => {
        dispatch(request(user));

        userService.newCustomer(user)
            .then(
                message => { 
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NEW_USER_REQUEST, user } }
    function success(message) { return { type: userConstants.NEW_USER_SUCCESS, message } }
    function failure(error) { return { type: userConstants.NEW_USER_FAILURE, error } }
}
function newWorker(user) {
    return dispatch => {
        dispatch(request(user));

        userService.newWorker(user)
            .then(
                message => { 
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NEW_USER_REQUEST, user } }
    function success(message) { return { type: userConstants.NEW_USER_SUCCESS, message } }
    function failure(error) { return { type: userConstants.NEW_USER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getWorkers(){
    return dispatch => {
        dispatch(request());

        userService.getWorkers()
            .then(
                workers => { 
                    dispatch(success(workers));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GETWORKERS_REQUEST } }
    function success(workers) { return { type: userConstants.GETWORKERS_SUCCESS, workers } }
    function failure(error) { return { type: userConstants.GETWORKERS_FAILURE, error } }
}

function resetPass(id, password, newPassword) {
    return dispatch => {
        dispatch(request({ id }));

        userService.resetPass(id, password, newPassword)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.RESET_PASSWORD_REQUEST, user } }
    function success(user) { return { type: userConstants.RESET_PASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function deleteWorker(userId){
    return dispatch=>{
        dispatch(request({ userId }));
        userService.deleteWorker(userId)
            .then(
                message => { 
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.DELETE_WORKER_REQUEST, user } }
    function success(message) { return { type: userConstants.DELETE_WORKER_SUCCESS, message } }
    function failure(error) { return { type: userConstants.DELETE_WORKER_FAILURE, error } }
}
 function rateWorker(ratings){
    let rates = [];
    Object.keys(ratings).forEach(key=> {
        const rate = {
            id: parseInt(key),
            rating: ratings[key]
        }
        rates.push(rate);
    });
    return dispatch=>{
        dispatch(request({ rates }));
        userService.rateWorker(rates)
            .then(
                message => { 
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(rates) { return { type: userConstants.RATE_WORKER_REQUEST, rates } }
    function success(message) { return { type: userConstants.RATE_WORKER_SUCCESS, message } }
    function failure(error) { return { type: userConstants.RATE_WORKER_FAILURE, error } }
 }
 function getRatings(){
    return dispatch => {
        dispatch(request());

        userService.getRatings()
            .then(
                ratings => { 
                    dispatch(success(ratings));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_RATINGS_REQUEST } }
    function success(ratings) { return { type: userConstants.GET_RATINGS_SUCCESS, ratings } }
    function failure(error) { return { type: userConstants.GET_RATINGS_FAILURE, error } }
}
function getWorker(workerId) {
    return dispatch => {
        dispatch(request());

        userService.getWorker(workerId)
            .then(
                worker => { 
                    dispatch(success(worker));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_WORKER_REQUEST } }
    function success(worker) { return { type: userConstants.GET_WORKER_SUCCESS, worker } }
    function failure(error) { return { type: userConstants.GET_WORKER_FAILURE, error } }
}
function updateUser(id, user) {
    return dispatch => {
        dispatch(request(user));

        userService.updateUser(id, user)
            .then(
                message => { 
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_USER_REQUEST, user } }
    function success(message) { return { type: userConstants.UPDATE_USER_SUCCESS, message } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}
function getCustomer(customerId) {
    return dispatch => {
        dispatch(request());

        userService.getCustomer(customerId)
            .then(
                customer => { 
                    dispatch(success(customer));
                    dispatch(alertActions.error(null))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_CUSTOMER_REQUEST } }
    function success(customer) { return { type: userConstants.GET_CUSTOMER_SUCCESS, customer } }
    function failure(error) { return { type: userConstants.GET_CUSTOMER_FAILURE, error } }
}
 
function getSalary(workerId, date) {
    return dispatch => {
        dispatch(request());

        userService.getSalary(workerId, date)
            .then(
                salary => { 
                    dispatch(success(salary));
                    dispatch(alertActions.error(null));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_SALARY_REQUEST } }
    function success(salary) { return { type: userConstants.GET_SALARY_SUCCESS, salary } }
    function failure(error) { return { type: userConstants.GET_SALARY_FAILURE, error } }
}

function getCustomers(){
    return dispatch => {
        dispatch(request());

        userService.getCustomers()
            .then(
                customers => { 
                    dispatch(success(customers));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_CUSTOMERS_REQUEST } }
    function success(customers) { return { type: userConstants.GET_CUSTOMERS_SUCCESS, customers } }
    function failure(error) { return { type: userConstants.GET_CUSTOMERS_FAILURE, error } }
}
function getReferralsCustomers(userId){
    return dispatch => {
        dispatch(request());

        userService.getReferralsCustomers(userId)
            .then(
                customers => { 
                    dispatch(success(customers));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_REFERRALS_CUSTOMERS_REQUEST } }
    function success(customers) { return { type: userConstants.GET_REFERRALS_CUSTOMERS_SUCCESS, customers } }
    function failure(error) { return { type: userConstants.GET_REFERRALS_CUSTOMERS_FAILURE, error } }
}



