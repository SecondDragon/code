import { request } from './request';

export async function login(data) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request({
    url: '/admin/logout',
    method: 'POST',
  });
}