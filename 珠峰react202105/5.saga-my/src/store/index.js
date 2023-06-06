import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from '../redux-saga';
import rootSaga from './sagas';
let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSaga);
export default store;

//store.dispatch=sagaMiddleware.dispatch({type:actionTypes.ASYNC_ADD})