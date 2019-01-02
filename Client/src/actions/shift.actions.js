import { shiftConstants } from '../constants';
import { shiftService } from '../services';
import { alertActions } from './';

export const shiftActions = {
    getShifts,
    createShifts,
    deleteShift
};

function getShifts(weekNumber){
    return dispatch => {
        dispatch(request());

        shiftService.getShifts(weekNumber)
            .then(
                shifts => { 
                    dispatch(success(shifts));
                    dispatch(alertActions.success(null));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: shiftConstants.GET_SHIFTS_REQUEST} }
    function success(shifts) { return { type: shiftConstants.GET_SHIFTS_SUCCESS, shifts } }
    function failure(error) { return { type: shiftConstants.GET_SHIFTS_FAILURE, error } }
}

function createShifts(oldShifts, shifts, user){
    return dispatch => {
        dispatch(request(oldShifts));

        shiftService.createShifts(shifts)
            .then(
                message => { 
                    dispatch(success(message, shifts, user));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(shifts) { return { type: shiftConstants.NEW_SHIFT_REQUEST, items: shifts} }
    function success(message, shifts, user) { return { type: shiftConstants.NEW_SHIFT_SUCCESS, message, shifts, user } }
    function failure(error) { return { type: shiftConstants.NEW_SHIFT_FAILURE, error } }
}

function deleteShift(oldShifts, id) {
    return dispatch => {
        dispatch(request(oldShifts));

        shiftService.deleteShift(id)
            .then(
                message => { 
                    dispatch(success(id, message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(shifts) { return { type: shiftConstants.DELETE_SHIFT_REQUEST, items: {shifts} } }
    function success(id, message) { return { type: shiftConstants.DELETE_SHIFT_SUCCESS, id, message } }
    function failure(error) { return { type: shiftConstants.DELETE_SHIFT_FAILURE, error } }
}