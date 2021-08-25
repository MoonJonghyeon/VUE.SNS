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
        const index = state.followingList.findIndex(v => v.id === payload.id)
        state.followingList.splice(index, 1);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id)
        state.followerList.splice(index, 1);
    },
    loadFollowing(state) {
        const diff = totalFollowings - state.followingList.length
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }))
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit
    },
    loadFollower(state) {
        const diff = totalFollowers - state.followerList.length
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }))
        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit
    }
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
        commit('changeNickname', payload)
    },
    addFollowing({commit}, payload) {
        commit('addFollowing', payload)
    },
    addFollower({commit}, payload) {
        commit('addFollower', payload)        
    },
    removeFollowing({commit}, payload) {
        commit('removeFollowing', payload)
    },
    removeFollower({commit}, payload) {
        commit('removeFollower', payload)
    },
    loadFollowing({commit, state}, payload) {
        if(state.hasMoreFollowing) {
            commit('loadFollowing')
        }
    },
    loadFollower({commit, state}, payload) {
        if(state.hasMoreFollower) {
            commit('loadFollower')
        }
    }
}