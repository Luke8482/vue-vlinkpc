const ls = localStorage

export default {
    setItem(name, value) {
        ls.setItem(name, JSON.stringify(value))
    },
    getItem(name) {
        try {
            return JSON.parse(ls.getItem(name))
        } catch (e) {
            return null
        }
    },
    removeItem(name) {
        ls.removeItem(name)
    },

    getUser() {
        return this.getItem('user')
    },

    setUser(user) {
        return this.setItem('user', user)
    },

    getToken() {
        return this.getItem('access_token')
    },

    getTokenExpiredAt() {
        return this.getItem('access_token_expired_at')
    },

    setToken(value) {
        const accessToken = value.access_token;
        const accessTokenExpiredAt = new Date().getTime() + value.expires_in * 1000;

        this.setItem('access_token', accessToken);
        this.setItem('access_token_expired_at', accessTokenExpiredAt)
    },

    logout() {
        return ls.clear()
    }
}