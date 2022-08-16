import { logins, logout, refresh, getCurrentUser } from '@/service/api/index'    //TODO......
import ls from '@/utils/localStorage'   //已修改修改为localStorage
import isEmpty from 'lodash/isEmpty'   //已安装
import bus from '@/views/admin/common/bus'

const getDefaultState = () => {
    return {
        user: ls.getItem('user'),
        accessToken: ls.getItem('access_token'),
        accessTokenExpiredAt: ls.getItem('access_token_expired_at')
    }
};

const state = getDefaultState();

// 定义 getters
var getters = {
    isLoggedIn: state => !isEmpty(state.accessToken),
    user: state => state.user,
    accessToken: state => state.accessToken,
    accessTokenExpiredAt: state => state.accessTokenExpiredAt
};

// 定义 actions
const actions = {
    async login ({ dispatch, commit }, loginData) {

        //自行设计的代码

        const authResponse = await logins(loginData);
        console.log(authResponse);

        commit('setToken', authResponse);
        // auth.setToken(authResponse.data);    //原来代码
        ls.setToken(authResponse);

        // 设置权限，监听登录事件，登录，则调用APP文件内的 loginDirect 方法
        bus.$emit('loginDirect');

        dispatch('getUser')
    },

    //获取用户信息
    async getUser ({ dispatch, commit }) {
        const userResponse = await getCurrentUser();

        commit('setUser', userResponse);
        ls.setUser(userResponse)
    },

    // 刷新token的action
    async refresh ({ dispatch, commit, state }, params = {}) {
        const refreshResponse = await refresh(state.accessToken, {}, false); //todo... 删除多余参数需验证是否可行
        console.log(refreshResponse);
        commit('setToken', refreshResponse);
        ls.setToken(refreshResponse);



        dispatch('getUser')
    },

    // 退出登录的action
    async logout ({ commit, state }) {
        try {
            await logout(state.accessToken);

            // 清空 storage
            ls.logout();
            commit('resetState');

            // 设置权限，监听退出事件，退出登录，则调用APP文件内的 logoutDirect 方法
            bus.$emit("logoutDirect");
        } catch (e) {    //  报错，如：token多次刷新被列入黑名单，也需要清除本地登录信息，执行退出操作
            ls.logout();
            commit('resetState');

            // 设置权限，监听退出事件，退出登录，则调用APP文件内的 logoutDirect 方法
            bus.$emit("logoutDirect");
        }
    }
};



// 定义 mutations
const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setToken(state, tokenPayload) {
        state.accessToken = tokenPayload.access_token;
        state.accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000   //todo 过期时间是否需要重新设置
    },
    resetState: (state) => {
        Object.assign(state, getDefaultState())
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}