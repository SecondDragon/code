import { AnyAction } from 'redux';
import * as actionTypes from '@/store/action-types';
import Slider from '@/typings/slider';
import { Lesson } from '@/typings/lesson';
export interface Lessons {
    loading: boolean;//是否正在加载
    list: Lessons[];//存放的是当前所有的课程列表
    hasMore: boolean;//是否有更多
    offset: number;//偏移量
    limit: number;//每页返回的条数
}
export interface HomeState {
    currentCategory: string,
    sliders: Slider[],
    lessons: Lessons
}
let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,
        list: [],
        hasMore: true,
        offset: 0,
        limit: 5
    }
};
function home(state = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            state.currentCategory=action.payload;
            break;
        case actionTypes.GET_SLIDERS:
            state.sliders= action.payload.data;
            break;
        case actionTypes.SET_LESSONS_LOADING:
            state.lessons.loading= action.payload;
            break;
        case actionTypes.SET_LESSONS:
            state.lessons.loading=false;
            state.lessons.hasMore=action.payload.hasMore;
            state.lessons.list.push(...action.payload.list);
            state.lessons.offset+= action.payload.list.length;
            break;
        case actionTypes.REFRESH_LESSONS:
            state.lessons.loading=false;
            state.lessons.hasMore=action.payload.hasMore;
            state.lessons.list=action.payload.list;
            state.lessons.offset= action.payload.list.length;
            break;
        default:
            break; 
    }
    return state;
}
export default home;