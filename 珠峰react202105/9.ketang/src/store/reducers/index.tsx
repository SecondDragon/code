import {ReducersMapObject,Reducer} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../history';
import home from './home';
import cart from './cart';
import profile from './profile';
import {combineReducers} from 'redux-immer';
import produce from 'immer';
let reducers:ReducersMapObject = {
    router:connectRouter(history),
    home,
    cart,
    profile
}
export type CombinedState = {
    //key就是reducers所有的key的集合，值就是reducer函数返回值的类型
    [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>
}

let rootReducer = combineReducers(produce,reducers);
export default rootReducer;
/**
 * CombinedState= {
 *  home:HomeState,
    cart:CartState,
    profile:ProfileState
 * }
 */