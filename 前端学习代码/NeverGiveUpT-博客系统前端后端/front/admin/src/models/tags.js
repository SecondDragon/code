import {
  queryList
} from '@/services/tags';

const TagsModel = {
  namespace: 'tags',
  state: {
    list: [],
  },
  effects: {
    * queryList(_, {
      call,
      put
    }) {
      const res = yield call(queryList);
      yield put({
        type: 'changeList',
        payload: res,
      });
    },
  },
  reducers: {
    changeList(state, {
      payload
    }) {
      console.log('payload', payload);
      return {
        ...state,
        list: payload.data.list
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default TagsModel;
