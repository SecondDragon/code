const qs = require('qs');
export default function ajax(option = {}) {
	option = Object.assign({
		url: '',
		method: 'get',
		data: null,
		success: null
	}, option);
	
	option.data = qs.stringify(option.data); //x-www-form-urlencoded
	let isGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(option.method);
	if (isGET && option.data) {
		let char = option.url.includes('?') ? '&' : '?';
		option.url += `${char}${option.data}`;
		option.data = null;
	}

	// 发送请求
	let xhr = new XMLHttpRequest;
	xhr.open(option.method, option.url);
	xhr.onreadystatechange = function () {
		if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
			// 成功从服务器获取结果  JSON字符串
			typeof option.success === "function" ? option.success(JSON.parse(xhr.responseText)) : null;
		}
	};
	xhr.send(option.data);
}