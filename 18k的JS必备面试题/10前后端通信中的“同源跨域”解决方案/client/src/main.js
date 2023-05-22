/*
 * fetch是浏览器内置的函数，基于fetch可以向服务器发送请求，核心原理和AJAX XMLHttpRequest 不一致（天生就是基于PROMISE管理的）

 * 不论服务器返回的状态码是多少，都按照PROMISE成功算；只有断网，才算失败;
 */
fetch('/user/login', {
	method: 'post'
}).then(response => {
	return response.json();
}).then(result => {
	console.log(result);
});