import { AnyAction } from 'redux';
import { LOGIN_TYPES } from '@/typings/login_status';
import * as actionTypes from '@/store/action-types'
export interface ProfileState {
    loginState: LOGIN_TYPES, //当前用户的登录状态
    user: any, //用户信息
    error: string | null  //错误信息
}
let initialState: ProfileState = {
    loginState: LOGIN_TYPES.UN_VALIDATE, //默认状态是未验证
    user: null,
    error: null
};
function profile(state = initialState, action: AnyAction): ProfileState {
    switch (action.type) {
        case actionTypes.USER_VALIDATE:
            if (action.payload.success) {
                return {
                    ...state,
                    loginState: LOGIN_TYPES.LOGIN_SUCCESS, //登录成功
                    user: action.payload.data, //用户信息
                    error: null //错误信息
                }
            } else {
                return {
                    ...state,
                    loginState: LOGIN_TYPES.UN_LOGIN, //登录失败
                    user: null, //用户信息
                    error: action.payload //错误信息
                }
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                loginState: LOGIN_TYPES.UN_LOGIN, //登录失败
                user: null, //用户信息
                error: null //错误信息
            }
        case actionTypes.CHANGE_AVATAR:
            return {
                ...state,
                user: {...state.user,avatar:action.payload}
            }
        default:
            return state;
    }
}
export default profile;