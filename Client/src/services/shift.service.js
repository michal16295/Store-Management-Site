import { userService } from './user.service';
import * as request from './req.options';

const serverAddress = "http://localhost:5000";

export const shiftService = {
    getShifts,
    createShifts,
    deleteShift
};

function getShifts(weekNumber) {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/shifts/' + weekNumber, requestOptions)
        .then(handleResponse)
        .then(shifts => {
            return shifts;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function createShifts(shifts) {
    const requestOptions = request.postRequest(shifts);
    return fetch(serverAddress + '/shifts/create', requestOptions)
        .then(handleResponse)
        .then(message => {
            return message;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function deleteShift(id) {
    const requestOptions = request.deleteRequest();
    return fetch(serverAddress + '/shifts/delete/' + id, requestOptions)
        .then(handleResponse)
        .then(message => {
            return message;
        })
        .catch(err => {
            return Promise.reject(err);
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
                userService.logout();
                window.location.reload(true);
            }

            const error = data || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
} 