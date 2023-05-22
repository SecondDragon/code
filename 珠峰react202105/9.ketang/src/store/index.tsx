import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import history from './history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',//如果把数据保存到localStorage里 setItem('key')
    storage,//保存策略 默认是 localStorage
    whitelist:['home','cart'] //如果设置了白名单，只会持久化白名单 里的字段里的数据
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = applyMiddleware(
    routerMiddleware(history), thunk, promise, logger)(createStore)(persistedReducer);
let persistor = persistStore(store);
export  { store, persistor };