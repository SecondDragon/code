import request from "./request";

// 获取轮播图列表
const carouselsList = (pageNumber = 1, pageSize = 10) => {
    return request.get('/api/carousels', {
        params: {
            pageNumber,
            pageSize
        }
    });
};

// 获取轮播图详细信息
const carouselsInfo = (carouselsId = 0) => {
    return request.get(`/api/carousels/${carouselsId}`);
};

// 新增轮播图信息
const carouselsInsert = (body) => {
    return request.post('/api/carousels', body);
};

// 修改轮播图信息
const carouselsUpdate = (body) => {
    return request.put('/api/carousels', body);
};

// 删除轮播图信息
const carouselsRemove = (ids = []) => {
    return request('/api/carousels', {
        method: 'DELETE',
        data: {
            ids
        }
    });
};

export default {
    carouselsList,
    carouselsInfo,
    carouselsInsert,
    carouselsUpdate,
    carouselsRemove
};