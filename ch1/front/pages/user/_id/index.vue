<template>
 <v-container>
   <v-card style="margin-bttom: 20px">
     <v-container>
       {{other.nickname}}
       <v-row>
         <v-col cols="4">{{other.Followings.length}} Following</v-col>
         <v-col cols="4">{{other.Followers.length}} Follower</v-col>
         <v-col cols="4">{{other.Posts.length}} Post</v-col>
       </v-row>
     </v-container>
   </v-card>
  <div>
    <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
  </div>
</v-container>
</template>

<script>
import PostCard from '~/components/PostCard'
  export default {
    components: {
      PostCard,
    },
    data () {
      return {
        name:'Nuxt.js',
      }
    },
    fetch({store, params}) {
      store.dispatch('users/loadOther', {
        userId: params.id,
      })
      return store.dispatch('posts/loadUserPosts', {
        userId: params.id,
        reset: true
      })
    },
    
    computed: {
      other() {
        return this.$store.state.users.other
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      window.addEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if(this.hasMorePost) {
            this.$store.dispatch('posts/loadPosts')
          }
        }        
      }
    }

  }

</script>

<style>

</style>