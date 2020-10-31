import {combineReducers} from 'redux';
import AuthReducer from './Auth';
import ProductsReducer from './Products';
import ApplicationReducer from './Application';

export default combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  application: ApplicationReducer,
});
