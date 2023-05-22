axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data, headers) {
    let ContentType = headers['Content-Type'] || headers.common['Content-Type'] || headers.post['Content-Type'] || 'application/json';
    if (ContentType === "application/json") {
        return JSON.stringify(data);
    }
    if (ContentType === "application/x-www-form-urlencoded") {
        return Qs.stringify(data);
    }
    return data;
};
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};
axios.interceptors.request.use(function (config) {
    let Token = localStorage.getItem('Token');
    if (Token) {
        config.headers['Authorization'] = Token;
    }
    return config;
});
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (reason) {
    let response = reason.response;
    if (response) {
        switch (response.status) {}
    } else {
        if (reason && reason.code === "ECONNABORTED") {}
        if (!navigator.onLine) {}
    }
    return Promise.reject(reason);
});