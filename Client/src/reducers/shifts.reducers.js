import { shiftConstants } from '../constants';

export function shifts(state = {}, action) {
  switch (action.type) {
    case shiftConstants.GET_SHIFTS_REQUEST:
      return {

      };
    case shiftConstants.GET_SHIFTS_SUCCESS:
      return {
        items: action.shifts
      };
    case shiftConstants.GET_SHIFTS_FAILURE:
      return { 
        error: action.error
      };
    case shiftConstants.NEW_SHIFT_REQUEST:
      return {
        items: state.items
      };
    case shiftConstants.NEW_SHIFT_SUCCESS:
      let newItems = action.shifts.map(s => {
        return {
          _id: null, 
          shift: s.shift,
          date: s.date.toString(),
          userName: action.user.firstName + " " + action.user.lastName,
          userId: action.user.id
        }
      });
      const newArray = [...newItems, ...state.items];
      return {
        message: action.message,
        items: newArray
      };
    case shiftConstants.NEW_SHIFT_FAILURE:
      return { 
        error: action.error
      };
    case shiftConstants.DELETE_SHIFT_REQUEST:
      return {
        items: state.items
      };
    case shiftConstants.DELETE_SHIFT_SUCCESS:
      state.items = state.items.filter(item => item._id !== action.id);
      return {
        message: action.message,
        items: state.items
      };
    case shiftConstants.DELETE_SHIFT_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}