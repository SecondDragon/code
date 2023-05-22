/* 仅仅是对request方法，加一些请求的快捷方案 */
import { request } from '@umijs/max';
import _ from '@/assets/utils';

['GET', 'HEAD', 'DELETE', 'OPTIONS'].forEach(name => {
    request[name.toLowerCase()] = function (url, options) {
        if (!_.isPlainObject(options)) options = {};
        options.method = name;
        return request(url, options);
    };
});

['POST', 'PUT', 'PATCH'].forEach(name => {
    request[name.toLowerCase()] = function (url, data, options) {
        if (!_.isPlainObject(options)) options = {};
        options.method = name;
        options.data = data;
        return request(url, options);
    };
});

export default request;