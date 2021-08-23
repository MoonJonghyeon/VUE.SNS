export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
});
const totalPosts = 51;
const limit = 10;
export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload)
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id);
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload)
    },
    loadPosts(state) {
        const diff = totalPosts - state.mainPosts.length
        const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            User: {
                id: 1,
                nickname: 'hogu'
            },
            content: `hello infinite scroll ${Math.random()}`,
            Comments: [],
            Img: [],
        }))
        state.mainPosts = state.mainPosts.concat(fakePosts)
        state.hasMorePost = fakePosts.length === limit;
    },
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload)
    },
    removeImagePaths(state, payload) {
        state.imagePaths.splice(payload, 1)
    }
}
export const actions = {
    add({commit}, payload) {
        commit('addMainPost', payload)
    },
    remove({commit}, payload) {
        commit('removeMainPost', payload)
    },
    addComment({commit}, payload) {
        commit('addComment', payload)
    },
    loadPosts({commit, state}, payload) {
        if(state.hasMorePost) {
            commit('loadPosts')
        }
    },
    uploadImages({commit}, payload) {
        this.$axios.post('http://localhost:3085/post/images', payload, {
            withCredentials: true
        })
        .then ((res) => {
            commit('concatImagePaths', res.data)
        })
        .catch(() => {

        })

    }
}