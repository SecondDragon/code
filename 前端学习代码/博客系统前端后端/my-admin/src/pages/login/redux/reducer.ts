// import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
import { LOGIN } from './actionTypes';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
  userInfo?: {
    name?: string;
    avatar?: string;
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const userInfo = {
        ...action.payload,
        avatar: 'http://nevergiveupt.top:3000/static/mine.d0f112df.jpeg',
        name: action.payload.userName,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo;
    }
    default:
      return state;
  }
}
