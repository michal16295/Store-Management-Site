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

    case userConstants.GET_CUSTOMER_REQUEST:
      return {};
    case userConstants.GET_CUSTOMER_SUCCESS:
      return {
        items: action.customer
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
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id ? { ...user, deleting: true } : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state;
  }
}
