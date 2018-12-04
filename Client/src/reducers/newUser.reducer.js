
import { userConstants } from '../constants';

export function newUser(state = {}, action) {
  switch (action.type) {
    case userConstants.NEW_USER_REQUEST:
      return { newUser: true };
    case userConstants.NEW_USER_SUCCESS:
      return {};
    case userConstants.NEW_USER_FAILURE:
      return {};
    default:
      return state
  }
}