import { userConstants } from '../constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETWORKERS_REQUEST:
      return {};
    case userConstants.GETWORKERS_SUCCESS:
      return {
        items: action.workers
      };
    case userConstants.GETWORKERS_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        items: state.items
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        message: action.message,
        items: state.items
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        error: action.error,
        items: state.items
      };
    case userConstants.GET_WORKER_REQUEST:
      return {};
    case userConstants.GET_WORKER_SUCCESS:
      return {
        items: action.worker
      };
    case userConstants.GET_WORKER_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GET_SALARY_REQUEST:
      return {
        
      };
    case userConstants.GET_SALARY_SUCCESS:
      return {
        items: action.salary
      };
    case userConstants.GET_SALARY_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.GET_CUSTOMER_REQUEST:
      return {};
    case userConstants.GET_CUSTOMER_SUCCESS:
      return {
        items: action.customer,
        error: null
      };
    case userConstants.GET_CUSTOMER_FAILURE:
      return {
        error: action.error
      };

    case userConstants.GET_RATINGS_REQUEST:
      return {};
    case userConstants.GET_RATINGS_SUCCESS:
      return {
        items: action.ratings
      };
    case userConstants.GET_RATINGS_FAILURE:
      return {
        error: action.error
      };
      
    case userConstants.DELETE_WORKER_REQUEST:
      return {

      };
    case userConstants.DELETE_WORKER_SUCCESS:
      return {
        message: action.message
      };
    case userConstants.DELETE_WORKER_FAILURE:
      return {
        error: action.error
      };

    case userConstants.GET_CUSTOMERS_REQUEST:
      return {};
    case userConstants.GET_CUSTOMERS_SUCCESS:
      return {
        items: action.customers
      };
    case userConstants.GET_CUSTOMERS_FAILURE:
      return {
        error: action.error
      };

    case userConstants.GET_REFERRALS_CUSTOMERS_REQUEST:
      return {};
    case userConstants.GET_REFERRALS_CUSTOMERS_SUCCESS:
      return {
        items: action.customers
      };
    case userConstants.GET_REFERRALS_CUSTOMERS_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
