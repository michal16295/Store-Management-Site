import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { users } from './users.reducers';
import { products } from './products.reducers';
import { shifts } from './shifts.reducers';

const rootReducer = combineReducers({
  authentication,
  alert,
  users,
  products,
  shifts
});

export default rootReducer;