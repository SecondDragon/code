/*
 * 面试必问：JQ Ajax、Axios、Fetch的核心区别 
 */
// Ajax前后端数据通信「同源、跨域」
/* 
let xhr = new XMLHttpRequest;
xhr.open('get', 'http://127.0.0.1:8888/user/list');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let text = xhr.responseText;
        console.log(JSON.parse(text));
    }
};
xhr.send(); 
*/

/* $.ajax({
    url: 'http://127.0.0.1:8888/user/list',
    method: 'get',
    success(result) {
        console.log(result);
    }
}); */


// 用户登录
// 登录成功 -> 获取用户信息

/* 回调地狱 */
/* $.ajax({
    url: 'http://127.0.0.1:8888/user/login',
    method: 'post',
    data: Qs.stringify({
        account: '18310612838',
        password: md5('1234567890')
    }),
    success(result) {
        if (result.code === 0) {
            // 登录成功
            $.ajax({
                url: 'http://127.0.0.1:8888/user/list',
                method: 'get',
                success(result) {
                    console.log(result);
                }
            });
        }
    }
}); */

/* 
/!* Axios也是对ajax的封装，基于Promise管理请求，解决回调地狱问题（await） *!/
(async function () {
    let result = await axios.post('/user/login', {
        account: '18310612838',
        password: md5('1234567890')
    });

    result = await axios.get('/user/list');
    console.log(result);
})(); 
*/

/* Fetch是ES6新增的通信方法，不是ajax，但是他本身实现数据通信，就是基于promise管理的 */
/* (async function () {
    let result = await fetch('http://127.0.0.1:8888/user/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Qs.stringify({
            account: '18310612838',
            password: md5('1234567890')
        })
    }).then(response => {
        return response.json();
    });

    result = await fetch('http://127.0.0.1:8888/user/list').then(response => {
        return response.json();
    });
    console.log(result);
})(); */