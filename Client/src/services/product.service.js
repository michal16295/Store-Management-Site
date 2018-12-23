import { authHeader } from '../helpers';
import * as request from './req.options';
import { userService } from './user.service';

const serverAddress = "http://localhost:5000";

export const productService = {
    addProduct,
    getProducts,
    getProduct,
    orderProduct,
    deleteProduct

};

function addProduct(product) {
    const requestOptions = request.postRequest(product);
    return fetch(serverAddress + "/products/newProduct", requestOptions).then(handleResponse)
    .then(message =>{
        return message;
    }).catch(err =>{
        return Promise.reject(err);
    });
}

function getProducts() {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/products', requestOptions)
        .then(handleResponse)
        .then(products => {
            return products;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function getProduct(id) {
    const requestOptions = request.getRequest();
    return fetch(serverAddress + '/products/' + id, requestOptions)
        .then(handleResponse)
        .then(product => {
            return product;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function orderProduct(id, quantity) {
    const requestOptions = request.putRequest({quantity});
    return fetch(serverAddress + '/products/buy/' + id, requestOptions)
        .then(handleResponse)
        .then(message => {
            return message;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function deleteProduct(productId) {
    const requestOptions = request.deleteRequest();
    return fetch(serverAddress + "/products/" + productId, requestOptions).then(handleResponse)
    .then(message => {
        return message;
    }).catch(err => {
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