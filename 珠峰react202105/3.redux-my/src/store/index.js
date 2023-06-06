
import { createStore, applyMiddleware } from '../redux';
import combinedReducer from './reducers';
import logger from './logger';
import thunk from './thunk';
import promise from './promise';
let initialState = { counter1: { number:10}, counter2: { number:20} };
//如果配置了多个中间件，多个中间件会进行级联 promise next=>thunk next=>logger next->store.dispatch
//let store = applyMiddleware(thunk, promise, logger)(createStore)(combinedReducer,initialState);
 let store = createStore(
    combinedReducer,
    initialState,
    applyMiddleware(thunk, promise, logger)
); 

export default store;