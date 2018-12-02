import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    getAll,
    resetPass,
    newUser

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
function newUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.newUser(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success('New User successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NEW_USER_REQUEST, user } }
    function success(user) { return { type: userConstants.NEW_USER_SUCCESS, user } }
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




