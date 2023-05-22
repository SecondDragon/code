import axios from "axios";
import Vue from "vue";
import router from "../router";
const vue = new Vue({
  router,
});

axios.interceptors.request.use(
  (config) => {
    config.baseURL = "/api/v1/web";
    config.timeout = 60 * 1000; // Timeout
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === 200) {
      if (data.code === 0) {
        return data;
      } else {
        vue.$toast.error(data.msg);
      }
    }
    return response;
  },
  (error) => {
    const status = error.response.status;
    const obj = {
      401: "请注册或登录",
      402: "不存在该用户",
      422: "参数错误",
    };
    if (status) {
      if (status === 402) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("like");
        vue.$router.go(-1);
      }
      vue.$toast.error(obj[status]);
    } else {
      vue.$toast.error("服务器连接异常");
    }
    return Promise.reject();
  }
);

const get = (url, data) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // if (url.indexOf("/tkb") > -1) {
  //   console.log(url);
  //   return axios({
  //     method: "get",
  //     url,
  //     headers: {
  //       Origin: "https://www.tkb800.cc",
  //       "Access-Control-Request-Origin": "https://www.tkb800.cc",
  //     },
  //     data,
  //   }).then((response) => {
  //     return response;
  //   });
  // }
  return axios({
    method: "get",
    url,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + user.token || "",
    },
    data,
  }).then((response) => {
    return response;
  });
};

const post = (url, data) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return axios({
    method: "post",
    url,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + user.token || "",
    },
    data,
  }).then((response) => {
    return response;
  });
};

//上传文件
const form = (url, data) => {
  return post(url, data, true);
};

export default {
  get,
  post,
  form,
};
