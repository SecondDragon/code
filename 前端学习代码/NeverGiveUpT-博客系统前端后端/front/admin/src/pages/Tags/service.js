import request from '@/utils/request';
import {
  replacePage
} from '@/utils/utils';

export async function queryTags(params) {
  const res = await request('/api/tags', {
    params: replacePage(params),
  });
  return new Promise((resolve, reject) => {
    if (res.code === 0) {
      res.data && resolve({
        data: res.data.list,
        current: res.data.page,
        total: res.data.totalCount,
        success: true,
        pageSize: res.data.pageSize,
      })
    } else {
      resolve({
        data: [],
        current: params.current,
        total: 0,
        success: false,
        pageSize: params.pageSize
      })
    }

  });
}

export async function addTags(params) {
  return request('/api/tags', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function removeTags(params) {
  return request('/api/tags', {
    method: 'delete',
    data: {
      ...params,
    },
  });
}

export async function updateTags(params) {
  return request('/api/tags', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateTagsStatus(params) {
  return request('/api/tags/status', {
    method: 'put',
    data: {
      ...params,
    },
  });
}