<template>
    <v-container v-if="post">
        <post-card :post="post" />
    </v-container>
    <div v-else>
        the post is not exist
    </div>
</template>

<script>
import PostCard from '~/components/PostCard'
export default {
    components: {
        PostCard,
    },
    computed: {
        post() {
            return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10))
        }
    },
    fetch({store, params}) {
        return store.dispatch('posts/loadPost', params.id)
    },
    head() {
        return {
            title: `${this.post.User.nickname} posted`,
            meta: [{
                hid: 'desc', name: 'description', content: this.post.content,
            }, {
                hid: 'ogtitle', property: 'og:title', content: `${this.post.User.nickname} posted`
            }, {
                hid: 'ogdesc', proporty: 'og:description', content: this.post.content
            }, {
                hid: 'ogimage', property: 'og:image', content: this.post.Images[0] ? this.post.Images[0].src : 'https://vue.nodebird.com/vue-nodebird.png'
            }, {
                hid: 'ogurl', property: 'og:url', content: `https://vue.nodebird.com/post/${this.post.id}`
            }]
        }
    }
}

</script>

<style>

</style>