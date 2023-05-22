import * as actionTypes from '@/store/action-types';
import {validate,register,login} from '@/api/profile';
import {AnyAction} from 'redux';
import {push} from 'connected-react-router';
import { message } from 'antd';
import {RegisterPayload,RegisterResult,LoginPayload,LoginResult} from '@/typings/profile'
export default {
    validate():AnyAction {
        return { 
            type: actionTypes.USER_VALIDATE,
            payload: validate()
        };
    },
    register(values:RegisterPayload){
        return  function(dispatch:any){
          ;(async function(){
            let result:RegisterResult = await register<RegisterResult>(values);
            if(result.success){
                dispatch(push('/login'));
            }else{
                message.error(result.message);
            }
          })()
        }
    },
    login(values:LoginPayload){
        return  function(dispatch:any){
          ;(async function(){
            let result:LoginResult = await login<LoginResult>(values);
            if(result.success){
                sessionStorage.setItem('access_token',result.data.token);
                dispatch(push('/profile'));
            }else{
                message.error(result.message);
            }
          })()
        }
    },
    logout(){
        return function(dispatch:any){//redux-thunk
          sessionStorage.removeItem('access_token');//清除本地token
          dispatch({type:actionTypes.LOG_OUT})//派发退出的动作
          dispatch(push('/login'));//想在actions里跳转路径，就可以使用push
        }
    },
    changeAvatar(avatar:string){
      return {
        type:actionTypes.CHANGE_AVATAR,
        payload:avatar
      }
    }
}
/**
 * payload 在请求结束之后会发生变化 
 * payload 是一个promise
 * 如果成功了 payload={success: true,data: user.toJSON()}
 * 如果失败了 payload 
 */