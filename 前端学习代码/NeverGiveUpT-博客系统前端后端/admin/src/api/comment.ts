import { request } from './request';

export async function getList(params) {
    return request({
        url: '/comment',
        params,
    });
}

export async function remove(data) {
    return request({
        url: '/comment',
        method: 'delete',
        data,
    });
}
export async function updateCommentStatus(data) {
    return request({
        url: '/comment',
        method: 'put',
        data,
    });
}
