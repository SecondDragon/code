import request from '@/utils/request';
import { replacePage } from '@/utils/utils';

export async function queryOrder(params) {
  const res = await request('/api/order', {
    params: replacePage(params),
  });
  return new Promise((resolve, reject) => {
    if (res.code === 0) {
      res.data &&
        resolve({
          data: res.data.list,
          current: res.data.page,
          total: res.data.totalCount,
          success: true,
          pageSize: res.data.pageSize,
        });
    } else {
      resolve({
        data: [],
        current: params.current,
        total: 0,
        success: false,
        pageSize: params.pageSize,
      });
    }
  });
}

export async function addOrder(params) {
  return request('/api/order', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeOrder(params) {
  return request('/api/order', {
    method: 'delete',
    data: {
      ...params,
    },
  });
}

export async function updateOrder(params) {
  return request('/api/order', {
    method: 'put',
    data: {
      ...params,
    },
  });
}
