import { request } from './request';

export async function getList(params) {
    return request({
        url: '/user',
        params,
    });
}

export async function remove(data) {
    return request({
        url: '/user',
        method: 'delete',
        data,
    });
}

