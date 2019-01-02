import { productConstants } from '../constants';
import { productService } from '../services';
import { alertActions } from './';

export const productsActions ={
    addProduct,
    getProducts,
    getProduct,
    orderProduct,
    deleteProduct
};

function addProduct(product){
    return dispatch => {
        dispatch(request(product));

        productService.addProduct(product)
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
    function request(product) { return { type: productConstants.NEW_PRODUCT_REQUEST, product } }
    function success(message) { return { type: productConstants.NEW_PRODUCT_SUCCESS, message } }
    function failure(error) { return { type: productConstants.NEW_PRODUCT_FAILURE, error } }

}

function getProducts(){
    return dispatch => {
        dispatch(request());

        productService.getProducts()
            .then(
                products => { 
                    dispatch(success(products));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: productConstants.GET_PRODUCTS_REQUEST} }
    function success(products) { return { type: productConstants.GET_PRODUCTS_SUCCESS, products  } }
    function failure(error) { return { type: productConstants.GET_PRODUCTS_FAILURE, error } }
}

function orderProduct(id, quantity){
    return dispatch => {
        dispatch(request(id));

        productService.orderProduct(id, quantity)
            .then(
                message =>{
                    dispatch(success(message));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }

            );
    };
    function request(id) { return { type: productConstants.ORDER_PRODUCT_REQUEST, id} }
    function success(message) { return { type: productConstants.ORDER_PRODUCT_SUCCESS, message } }
    function failure(error) { return { type: productConstants.ORDER_PRODUCT_FAILURE, error } }
}

function getProduct(id){
    return dispatch => {
        dispatch(request(id));
        
        productService.getProduct(id)
            .then(
                product => { 
                    dispatch(success(product));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: productConstants.GET_PRODUCT_REQUEST, id} }
    function success(product) { return { type: productConstants.GET_PRODUCT_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GET_PRODUCT_FAILURE, error } }
}

function deleteProduct(productId){
    return dispatch=>{
        dispatch(request({ productId }));
        productService.deleteProduct(productId)
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

    function request(product) { return { type: productConstants.DELETE_PRODUCT_REQUEST, product } }
    function success(message) { return { type: productConstants.DELETE_PRODUCT_REQUEST, message } }
    function failure(error) { return { type: productConstants.DELETE_PRODUCT_FAILURE, error } }
}