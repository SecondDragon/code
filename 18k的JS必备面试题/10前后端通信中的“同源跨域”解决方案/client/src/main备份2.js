import axios from './api/axios';

function getUser() {
	return axios.get('/user/list');
}

function getJob() {
	return axios.get('/job/list');
}

function userLogin() {
	return axios.post('/user/login', {
		account: '珠峰培训',
		password: ''
	});
}

(async function () {
	let result = await getUser();
	console.log("1=>", result);

	result = await getJob();
	console.log("2=>", result);

	result = await userLogin();
	console.log("3=>", result);
})();