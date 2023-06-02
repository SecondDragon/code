import { request } from './request';

export async function upload(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
