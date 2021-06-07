import axios from 'axios'
import store from '@/store/index'
import * as util from './../../utils/permisson';

// todo。。。自行设计代码
const host = 'http://larabbs.test/api/v1';

// 普通请求
const request = async (url, configs = {}) => {
    // 拼接请求地址
    configs.url = url;

    let response = await instance(configs);

    if (response.status >= 200 && response.status < 300) {
        return response.data
    }

    // const error = new Error(response.data.message);  // TODO 是否与instance里的错误处理机制冲突
    // error.response = response;
    // return Promise.reject(error)
};


const checkToken = async () => {
    // 从缓存中取出 Token
    const accessToken = store.getters.accessToken;
    const expiredAt = store.getters.accessTokenExpiredAt;
    // 如果 token 过期了，则调用刷新方法
    if (accessToken && new Date().getTime() > expiredAt) {
        try {
            return store.dispatch('refresh');
        } catch (err) {
            return store.dispatch('login')
        }
    }
};

// 普通请求
const authRequest = async (url, configs = {}) => {
    await checkToken();

    configs.headers = {
        Authorization: 'Bearer ' + store.getters.accessToken
    };
    return await request(url, configs)
};


const instance = axios.create({
    baseURL: host,
    // timeout: 10000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance.interceptors.response.use(function(response) {
    return response;
}, util.catchError);



export {
    request,
    authRequest,
    instance,
}


