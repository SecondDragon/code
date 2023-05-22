import request from '@/utils/request';

export async function upload(data) {
  return request('/api/upload', {
    method: 'POST',
    data,
  });
}
