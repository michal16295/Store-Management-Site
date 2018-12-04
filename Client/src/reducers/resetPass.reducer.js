
import { userConstants } from '../constants';

export function resetPass(state = {}, action) {
  switch (action.type) {
    case userConstants.RESET_PASSWORD_REQUEST:
      return { resetPass: true };
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {};
    case userConstants.RESET_PASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}