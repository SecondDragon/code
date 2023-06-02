import * as Types from '@/store/action-types';
const userMutations = {
     [Types.SET_USER](state,payload){
          state.token = payload.token;
          state.username = payload.username;
          state.authList = payload.authList;

          // cookie -> localStorage
          if(payload.token){ // 存储token
               localStorage.setItem('token',payload.token); 
          }
     },
     [Types.SET_PERMISSION](state,payload){
          state.hasPermission = payload;
     },
     [Types.SET_MENU_PERMISSION](state,payload){
          state.menuPermission = payload
     }
}


export default userMutations



