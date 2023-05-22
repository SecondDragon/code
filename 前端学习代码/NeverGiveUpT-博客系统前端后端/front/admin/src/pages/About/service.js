import request from '@/utils/request';

export async function queryAbout(data) {
  return request('/api/about', {
    method: 'GET',
    data,
  });
}

export async function addAbout(params) {
  return request('/api/about', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAbout(params) {
  return request('/api/about', {
    method: 'put',
    data: {
      ...params,
    },
  });
}


