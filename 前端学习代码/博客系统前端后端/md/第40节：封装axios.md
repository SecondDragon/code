

# 第40节：封装axios

```
export default {
  'login.p_userName': '请输入用户名',
  'login.p_userName_pattern': '用户名5-20位',
  'login.p_password_pattern': '密码6-20位数字字母下划线组合',
  'login.p_password': '请输入密码',
  'login.login': '登录',
};
```

```
export default {
  'login.p_userName': 'Please input user name',
  'login.p_userName_pattern': 'user name 5-20 bits',
  'login.p_password_pattern': 'Password 6-20 digits, alphanumeric and underline combination ',
  'login.p_password': 'Please input password',
  'login.login': 'Login',
};
```



## 1.实现登录接口



修改`admin/src/mock/user.ts`

```ts
import Mock from 'mockjs';
import setupMock from '../utils/setupMock';

setupMock({
  setup() {
    Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      return {
        name: '王立群',
        avatar:
          'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        email: 'wangliqun@email.com',
        job: 'frontend',
        jobName: '前端开发工程师',
        organization: 'Frontend',
        organizationName: '前端',
        location: 'beijing',
        locationName: '北京',
        introduction: '王力群并非是一个真实存在的人。',
        personalWebsite: 'https://www.arco.design',
      };
    });

    // 登录
    Mock.mock(new RegExp('/api/admin/login'), (params) => {
      const { userName, password } = JSON.parse(params.body);
      if (!userName) {
        return {
          code: 0,
          data: null,
          msg: '用户名不能为空',
        };
      }
      if (!password) {
        return {
          code: 0,
          data: null,
          msg: '密码不能为空',
        };
      }
      if (userName === 'admin' && password === '123456') {
        return {
          code: 0,
          data: {
            token: 'admin',
            userName: 'admin',
          },
          msg: '登录成功',
        };
      }
      return {
        code: 0,
        data: null,
        msg: '账号或者密码错误',
      };
    });
  },
});

```

```
function login(params) {
  setErrorMessage('');
  setLoading(true);
  axios
    .post('/api/admin/login', params)
    .then((res) => {
    console.log(res);
    if (res.data.data) {
      if (res.data.code === 0) {
        afterLoginSuccess(params);
      }
    } else {
      setErrorMessage(res.data.msg || '登录出错，请刷新重试');
    }
  })
    .finally(() => {
    setLoading(false);
  });
}
```



## 2.封装axios

新建`admin/src/api/request.ts`

```ts
import axios from 'axios';

export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
    // timeout: 5000,
  });

  //请求拦截
  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (error) => {
      console.log('error===', error.response); // 注意这里必须打印error.response
    }
  );

  return http(config);
};

```

新建：`admin/src/api/login.ts`

```ts
import { request } from './request';

export async function login(data) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  });
}
```

`admin/src/pages/login/form.tsx`修改：`login`方法

```tsx
import { login as adminLogin } from '../../api/login';


async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await adminLogin(params);
      if (res.data) {
        if ((res as any).code === 0) {
          afterLoginSuccess(params);
        }
      } else {
        setErrorMessage((res as any).msg);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }

    // axios
    //   .post('/api/admin/login', params)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.data) {
    //       if (res.data.code === 0) {
    //         afterLoginSuccess(params);
    //       }
    //     } else {
    //       setErrorMessage(res.data.msg || '登录出错，请刷新重试');
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }
```

