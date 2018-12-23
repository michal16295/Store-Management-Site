
import { productConstants } from '../constants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_REQUEST:
      return {
      };
    case productConstants.GET_PRODUCTS_SUCCESS:
      return {
        items: action.products
      };
    case productConstants.GET_PRODUCTS_FAILURE:
      return { 
        error: action.error
      };
    case productConstants.GET_PRODUCT_REQUEST:
      return {
        id: action.id
      };
    case productConstants.GET_PRODUCT_SUCCESS:
      return {
        item: action.product
      };
    case productConstants.GET_PRODUCT_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}