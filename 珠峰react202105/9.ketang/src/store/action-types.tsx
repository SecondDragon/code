//设置当前的分类
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

//发起验证用户是否登录的请求
export const USER_VALIDATE = 'USER_VALIDATE';

//发起退出登录请求
export const LOG_OUT = 'LOG_OUT';

//修改仓库中的用户头像
export const CHANGE_AVATAR = 'CHANGE_AVATAR';

//获取接口中轮播图数据
export const GET_SLIDERS = 'GET_SLIDERS';

//获取下一页的课程
export const GET_LESSONS = 'GET_LESSONS';
//设置loading状态
export const SET_LESSONS_LOADING = 'SET_LESSONS_LOADING';
//把后端接口的数据获取回来之后保存到redux的store中去
export const SET_LESSONS = 'SET_LESSONS';
//下拉刷新的时候，重新加载数据
export const REFRESH_LESSONS = 'REFRESH_LESSONS';
//给购物车加一个新的条目
export const ADD_CART_ITEM = 'ADD_CART_ITEM';