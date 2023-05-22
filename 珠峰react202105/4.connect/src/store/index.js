import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from '../connected-react-router';
import history from '../history';
import combinedReducer from './reducers';
const store = applyMiddleware(routerMiddleware(history))(createStore)(combinedReducer);
window.store =store;
export default store;