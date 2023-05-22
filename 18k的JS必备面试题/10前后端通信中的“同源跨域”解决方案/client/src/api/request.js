import qs from 'qs';

let baseURL = 'http://127.0.0.1:8888';
export default function request(url, options = {}) {
	url = baseURL + url;
	
	/*
	 * GET系列请求的处理 
	 */
	!options.method ? options.method = 'GET' : null;
	if (options.hasOwnProperty('params')) {
		if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
			const ask = url.includes('?') ? '&' : '?';
			url += `${ask}${qs.stringify(params)}`;
		}
		delete options.params;
	}

	/*
	 * 合并配置项 
	 */
	options = Object.assign({
		// 允许跨域携带资源凭证 same-origin同源可以  omit都拒绝
		credentials: 'include',
		// 设置请求头
		headers: {}
	}, options);
	options.headers.Accept = 'application/json';

	/*
	 * token的校验
	 */
	const token = localStorage.getItem('token');
	token && (options.headers.Authorization = token);

	/*
	 * POST请求的处理
	 */
	if (/^(POST|PUT)$/i.test(options.method)) {
		!options.type ? options.type = 'urlencoded' : null;
		if (options.type === 'urlencoded') {
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			options.body = qs.stringify(options.body);
		}
		if (options.type === 'json') {
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(options.body);
		}
	}

	return fetch(url, options).then(response => {
		// 返回的结果可能是非200状态码
		if (!/^(2|3)\d{2}$/.test(response.status)) {
			switch (response.status) {
				case 401:
					break;
				case 403:
					break;
				case 404:
					break;
			}
			return Promise.reject(response);
		}
		return response.json();
	}).catch(error => {
		if (!window.navigator.onLine) {
			// 断开网络了，可以让其跳转到断网页面
			return;
		}
		return Promise.reject(error);
	});
};