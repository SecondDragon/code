import qs from 'qs';
import { message } from 'antd';
import http from './api/http2';

/* 
 向服务器发送数据请求的方案：
   第一类：XMLHttpRequest
     + ajax：自己编写请求的逻辑和步骤
     + axios：第三方库，对XMLHttpRequest进行封装「基于promise进行封装」
   第二类：fetch
     ES6内置的API，本身即使基于promise，用全新的方案实现客户端和服务器端的数据请求
     + 不兼容IE
     + 机制的完善度上，还是不如XMLHttpRequest的「例如：无法设置超时时间、没有内置的请求中断的处理...」
   第三类：其它方案，主要是跨域为主
     + jsonp
     + postMessage
     + 利用img的src发送请求，实现数据埋点和上报！！
     + ...


 let promise实例(p) = fetch(请求地址,配置项);
   + 当请求成功，p的状态是fulfilled，值是请求回来的内容；如果请求失败，p的状态是rejected，值是失败原因！
   + fetch和axios有一个不一样的地方：
     + 在fetch中，只要服务器有反馈信息（不论HTTP状态码是多少），都说明网络请求成功，最后的实例p都是fulfilled，只有服务器没有任何反馈（例如：请求中断、请求超时、断网等），实例p才是rejected！
     + 在axios中，只有返回的状态码是以2开始的，才会让实例是成功态!
   ------
   配置项：
     + method 请求的方式，默认是GET「GET、HEAD、DELETE、OPTIONS；POST、PUT、PATCH；」
     + cache 缓存模式「*default, no-cache, reload, force-cache, only-if-cached」
     + credentials 资源凭证(例如cookie)「include, *same-origin, omit」
       fetch默认情况下，跨域请求中，是不允许携带资源凭证的，只有同源下才允许！！
       include：同源和跨域下都可以
       same-origin：只有同源才可以
       omit：都不可以
     + headers:普通对象{}/Headers实例
       自定义请求头信息
     + body:设置请求主体信息
       + 只适用于POST系列请求,在GET系列请求中设置body会报错{让返回的实例变为失败态}
       + body内容的格式是有要求的，并且需要指定 Content-Type 请求头信息
         + JSON字符串  application/json
           '{"name":"xxx","age":14,...}'
         + URLENCODED字符串  application/x-www-form-urlencoded
           'xxx=xxx&xxx=xxx'
         + 普通字符串  text/plain
         + FormData对象  multipart/form-data
           主要运用在文件上传(或者表单提交)的操作中！
           let fm=new FormData();
           fm.append('file',文件);
           ...
         + 二进制或者Buffer等格式
         + ...
     + 我们发现，相比较于axios来讲，fetch没有对GET系列请求，问号传参的信息做特殊的处理（axios中基于params设置问号参数信息），需要自己手动拼接到URL的末尾才可以！！
 */

/* 
Headers类：头处理类「请求头或者响应头」 
  Headers.prototype
    + append 新增头信息 
    + delete 删除头信息
    + forEach 迭代获取所有头信息
    + get 获取某一项的信息
    + has 验证是否包含某一项
    + ...
*/
/* let head = new Headers;
head.append('Content-Type', 'application/json');
head.append('name', 'zhufeng'); */

/* 
 服务器返回的response对象「Response类的实例」
   私有属性：
     + body 响应主体信息「它是一个ReadableStream可读流」
     + headers 响应头信息「它是Headers类的实例」
     + status/statusText 返回的HTTP状态码及描述
   Response.prototype
     + arrayBuffer
     + blob
     + formData
     + json
     + text
     + ...
     这些方法就是用来处理body可读流信息的，把可读流信息转换为我们自己需要的格式！！
     返回值是一个promise实例，这样可以避免，服务器返回的信息在转换中出现问题（例如：服务器返回的是一个流信息，我们转换为json对象肯定是不对的，此时可以让其返回失败的实例即可）
 */
/* let p = fetch('/api/getTaskList?state=2', {
    headers: head
});
p.then(response => {
    // 进入THEN中的时候，不一定是请求成功「因为状态码可能是各种情况」
    let { headers, status, statusText } = response;
    if (/^(2|3)\d{2}$/.test(status)) {
        // console.log('成功：', response);
        // console.log('服务器时间：', headers.get('Date'));
        return response.json();
    }
    // 获取数据失败的「状态码不对」
    return Promise.reject({
        code: -100,
        status,
        statusText
    });
}).then(value => {
    console.log('最终处理后的结果：', value);
}).catch(reason => {
    // 会有不同的失败情况
    // 1.服务器没有返回任何的信息
    // 2.状态码不对
    // 3.数据转换失败
    // ....
    console.log('失败：', reason);
}); */

/* document.body.addEventListener('click', function () {
    fetch('/api/addTask', {
        method: 'POST',
        // 设置请求头
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 自己手动把请求主体格式变为服务器需要的
        body: qs.stringify({
            task: '我学会了Fetch操作',
            time: '2022-12-15 12:00:00'
        })
    }).then(response => {
        let { status, statusText } = response;
        if (/^(2|3)\d{2}$/.test(status)) {
            return response.json();
        }
        return Promise.reject({
            code: -100,
            status,
            statusText
        });
    }).then(value => {
        console.log('最终处理后的结果：', value);
    }).catch(reason => {
        message.error('请求失败，请稍后再试~~');
    });
}); */


/* fetch中的请求中断 */
/* let ctrol = new AbortController();
fetch('/api/getTaskList', {
    // 请求中断的信号
    signal: ctrol.signal
}).then(response => {
    let { status, statusText } = response;
    if (/^(2|3)\d{2}$/.test(status)) return response.json();
    return Promise.reject({
        code: -100,
        status,
        statusText
    });
}).then(value => {
    console.log('最终处理后的结果：', value);
}).catch(reason => {
    // {code: 20,message: "The user aborted a request.", name: "AbortError"}
    console.dir(reason);
});
// 立即中断请求
// ctrol.abort(); */


/* let ctrol = new AbortController();
http.get('/api/getTaskList', {
    params: {
        state: 2
    },
    signal: ctrol.signal
}).then(value => {
    console.log('成功：', value);
});
ctrol.abort(); */


/* document.body.addEventListener('click', function () {
    http.post('/api/addTask', {
        task: '我学会了Fetch操作『包括封装』',
        time: '2022-12-15 12:00:00'
    }).then(value => {
        console.log('最终处理后的结果：', value);
    });
}); */