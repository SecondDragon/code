// import ajax from './lib/ajax2.js';

/* function getUser() {
	return ajax.get('http://127.0.0.1:8888/user/list');
}

function getJob() {
	return ajax.get('http://127.0.0.1:8888/job/list');
}

function userLogin() {
	return ajax.post('http://127.0.0.1:8888/user/login', {
		account: '珠峰培训',
		password: ''
	});
} */
/* 
(async function () {
	/!* getUser().then(result => {
		console.log("1=>", result);
		return getJob();
	}).then(result => {
		console.log("2=>", result);
		return userLogin();
	}).then(result => {
		console.log("3=>", result);
	}); *!/

	let result = await getUser();
	console.log("1=>", result);

	result = await getJob();
	console.log("2=>", result);

	result = await userLogin();
	console.log("3=>", result);
})();
 */


// 需求：AJAX串行  回调地狱
/* ajax({
	url: 'http://127.0.0.1:8888/user/list',
	method: 'get',
	success: function (result) {
		console.log("1=>", result);

		ajax({
			url: 'http://127.0.0.1:8888/job/list',
			success: function (result) {
				console.log("2=>", result);

				ajax({
					url: 'http://127.0.0.1:8888/user/login',
					method: 'post',
					data: {
						account: '珠峰培训',
						password: ''
					},
					success: function (result) {
						console.log("3=>", result);
					}
				});
			}
		});
	}
}); */