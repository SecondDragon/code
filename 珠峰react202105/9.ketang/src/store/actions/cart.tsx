import * as actionTypes from '@/store/action-types';
import { Lesson } from '@/typings/lesson';
import { message } from '_antd@4.16.1@antd';
export default {
  addCartItem(lesson: Lesson) {
    return function (dispatch: any) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson
      });
      message.info('添加购物车成功');
    }
  }
}