export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
});
const totalPosts = 51;
const limit = 10;
export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts.splice(index, 1);
    },
    loadComments(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments = payload        
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload)
    },
    loadPosts(state, payload) {
        state.mainPosts = state.mainPosts.concat(payload)
        state.hasMorePost = payload.length === limit;
    },
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload)
    },
    removeImagePaths(state, payload) {
        state.imagePaths.splice(payload, 1)
    },
    likePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId)
        state.mainPosts[index].Likers.splice(userIndex, 1)
    },
    unlikePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Likers.push({
            id: payload.userId
        })
    }
}
export const actions = {
    add({commit, state}, payload) {
        this.$axios.post('/post', {
            content: payload.content,
            image: state.imagePaths
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('addMainPost', res.data)
        })
        .catch((err) => {
            console.error(err)

        })
    },
    remove({commit}, payload) {
        this.$axios.delete(`/post/${payload.postId}`, {
            withCredentials: true
        })
        .then(() => {
            commit('removeMainPost', payload)
        })
        .catch(() => {

        })
        
    },
    addComment({commit}, payload) {
        this.$axios.post(`/post/${payload.postId}/comment`, {
            content: payload.content
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('addComment', res.data)
        })
        .catch(() => {

        })    
    },
    loadComments({commit}, payload) {
        this.$axios.get(`/post/${payload.postId}/comments`)
        .then((res) => {
            commit('loadComments', res.data)
        })
        .catch(() => {

        })
    },
    async loadPosts({ commit, state }, payload) {
        if(state.hasMorePost) {
            try {
            const res = await this.$axios.get(`/posts?offset=${state.mainPosts.length}&limit=10`);
            commit('loadPosts', res.data);
            } catch (err) {
            console.error(err);
            }
        }
    },
    uploadImages({commit}, payload) {
        this.$axios.post('/post/images', payload, {
            withCredentials: true
        })
        .then ((res) => {
            commit('concatImagePaths', res.data)
        })
        .catch(() => {

        })

    },
    retweet({commit}, payload) {
        this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
            withCredentials: true,
        })
        .then((res) => {
            commit('addMainPost', res.data)
        })
        .catch((err) => {
            console.error(err)
            alert(err.response.data)
        })
    },
    unlikePost({commit}, payload) {
        this.$axios.post(`/post/${payload.postId}/like`, {}, {
            withCredentials: true,
        })
        .then((res) => {
            commit('likePost', {
                userId: res.data.userId,
                postId: payload.postId
            })
        })
        .catch((err) => {
            console.error(err)
        })
    },
    likePost({commit}, payload) {
        this.$axios.delete(`/post/${payload.postId}/like`, {
            withCredentials: true,
        })
        .then((res) => {
            commit('unlikePost', {
                userId: res.data.userId,
                postId: payload.postId
            })
        })
        .catch((err) => {
            console.error(err)
        })

    },
}