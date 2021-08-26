export const state = () => ({
    me: null,
    followingList: [],
    followerList: [],
    hasMoreFollowing: true,
    hasMoreFollower: true,
});

const totalFollowings = 6;
const totalFollowers = 8;
const limit = 3;

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname
    },
    addFollowing(state, payload) {
        state.followingList.push(payload)
    },
    addFollower(state, payload) {
        state.followerList.push(payload)
    },
    removeFollowing(state, payload) {
        let index = state.me.Followings.findIndex(v => v.id === payload.userId)
        state.me.Followings.splice(index, 1);
        index = state.followingList.findIndex(v => v.id === payload.userId)
        state.followingList.splice(index, 1)
    },
    removeFollower(state, payload) {
        const index = state.me.Followers.findIndex(v => v.id === payload.userId)
        state.me.Follower.splice(index, 1);
        index = state.followrtList.findIndex(v => v.id === payload.userId)
        state.followrtList.splice(index, 1)
    },
    loadFollowing(state, payload) {
        if(payload.offset === 0) {
            state.followingList = payload.data
        } else {
            state.followingList = state.followingList.concat(payload.data);
        }
        state.hasMoreFollowing = payload.data.length === limit
    },
    loadFollower(state, payload) {
        if(payload.offset === 0) {
            state.followerList = payload.data
        } else {
            state.followerList = state.followerList.concat(payload.data);
        }
        state.hasMoreFollower = payload.data.length === limit
    },
    following(state, payload) {
        state.me.Followings.push({ id: payload.userId })
    },
}
export const actions = {
    async loadUser({state, commit}) {
        try {
            const res = await this.$axios.get('/user', {
                withCredentials: true,
            })
            console.log(res.data);
            commit('setMe', res.data)
            console.log(state)
        } catch (err) {
            console.error(err)
        }
    },
    signUp({commit, state}, payload) {
        this.$axios.post('/user', {
            email: payload.email,
            nickname: payload.nickname,
            password: payload.password
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    },
    logIn({commit}, payload) {
        this.$axios.post('/user/login', {
            email: payload.email,
            password: payload.password
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', res.data)
        })
        .catch((err) => {
            console.error(err);
        })
    },
    logOut({commit}, payload) {
        this.$axios.post('/user/logout', {}, {
            withCredentials: true
        })
        .then((res) => {
            commit('setMe', null)
        })
        .catch((err) => {
            console.error(err);
        })
    },
    changeNickname({commit}, payload) {
        this.$axios.patch('/user/nickname', {
            nickname: payload.nickname,
        }, {
            withCredentials: true,
        })
        .then(() => {
            commit('changeNickname', payload)
        })
        .catch((err) => {
            console.error(err)
        })
        commit('changeNickname', payload)
    },
    addFollowing({commit}, payload) {
        commit('addFollowing', payload)
    },
    addFollower({commit}, payload) {
        commit('addFollower', payload)        
    },
    removeFollower({commit}, payload) {
        commit('removeFollower', payload)
    },
    loadFollowing({commit, state}, payload) {
        if(!(payload && payload.offset === 0) && !state.hasMoreFollowing) {
            return
        }
        let offset = state.followingList.length;
        if(payload && payload.offset === 0) {
            offset = 0;
        }
            return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${offset}`, {
                withCredentials: true
            })
            .then((res) => {
                commit('loadFollowing', {
                    data: res.data,
                    offset,
                })
            })
            .catch((err) => {
                console.error(err)
            })
        
    },
    loadFollower({commit, state}, payload) {
        if(!(payload && payload.offset === 0) && !state.hasMoreFollower) {
            return
        }
        let offset = state.followerList.length;
        if(payload && payload.offset === 0) {
            offset = 0;
        }
            return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${offset}`, {
                withCredentials: true
            })
            .then((res) => {
                commit('loadFollower', {
                    data: res.data,
                    offset,
                })
            })
            .catch((err) => {
                console.error(err)
            })
    },
    follow({commit, state}, payload) {
        this.$axios.post(`/user/${payload.userId}/follow`, {}, {
            withCredentials: true,
        })
        .then(() => {
            commit('following', {
                userId: payload.userId
            })
        })
        .catch((err) => {
            console.error(err);
        })
    },
    unFollow({commit, state}, payload) {
        return this.$axios.delete(`/user/${payload.userId}/follow`, {
            withCredentials: true,
        })
        .then(() => {
            commit('removeFollowing', {
                userId: payload.userId
            })
        })
        .catch((err) => {
            console.error(err);
        })
    },
    removeFollower({commit}, payload) {
        return this.$axios.delete(`/user/${payload.userId}/follower`, {
            withCredentials: true
        })
        .then((res) => {
            commit('removeFollower', {
                userId: payload.userId
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }


}