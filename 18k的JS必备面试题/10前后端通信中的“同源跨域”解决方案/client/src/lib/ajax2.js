const qs = require('qs');

function ajax(option = {}) {
	option = Object.assign({
		url: '',
		method: 'get',
		data: null
	}, option);

	option.data = qs.stringify(option.data);
	let isGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(option.method);
	if (isGET && option.data) {
		let char = option.url.includes('?') ? '&' : '?';
		option.url += `${char}${option.data}`;
		option.data = null;
	}

	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest;
		xhr.open(option.method, option.url);
		xhr.onreadystatechange = function () {
			if (!/^2\d{2}$/.test(xhr.status)) {
				reject(xhr);
				return;
			}
			if (xhr.readyState === 4) {
				resolve(JSON.parse(xhr.responseText));
			}
		};
		xhr.send(option.data);
	});
}

['get', 'post', 'delete', 'put', 'head', 'options'].forEach(item => {
	ajax[item] = function (url = '', data = {}) {
		return ajax({
			url,
			method: item,
			data
		});
	};
});

export default ajax;