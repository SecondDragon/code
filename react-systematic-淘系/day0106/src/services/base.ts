/* 关于用户板块接口的封装 */
import request from './request';

// 用户登录
const adminUserLogin = (userName, passwordMd5) => {
    return request.post('/api/adminUser/login', {
        userName,
        passwordMd5
    });
};

// 获取登录者信息
const adminUserProfile = () => {
    return request.get('/api/adminUser/profile')
        .then(({ resultCode, data }) => {
            if (data) {
                data = {
                    ...data,
                    name: data.nickName,
                    avatar: 'https://img2.baidu.com/it/u=611556467,3523971250&fm=253&fmt=auto?w=200&h=200'
                };
            }
            return { resultCode, data };
        });
};

// 上传图片
const uploadFile = (file) => {
    let fm = new FormData;
    fm.append('file', file);
    return request.post('/api/upload/file', fm);
};

export default {
    uploadFile,
    adminUserLogin,
    adminUserProfile
};