<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>My profile</v-subheader>
        </v-container>
        <v-form v-model="valid" @submit.prevent="onChangeNickname">
          <v-text-field 
          v-model="nickname"
          label="nickname"
          :rules='nicknameRules'
          required
          />
          <v-btn color="blue" type="submit">Edit</v-btn>
        </v-form>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>Following</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn v-if="hasMoreFollowing" dark color="blue" style="width: 100%" @click="loadMoreFollowings">More</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>Follower</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn v-if="hasMoreFollower" dark color="blue" style="width: 100%" @click="loadMoreFollowers">More</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FollowList from '~/components/FollowList'
  export default {
    components: {
      FollowList,
    },
    middleware: "authenticated",
    data () {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력하세요'
        ]
      }
    },
    fetch({store}) {
      store.dispatch('users/loadFollower')
      return store.dispatch('users/loadFollowing')
    },
    head() {
      return {
        title : 'Profile'
      }
    },
    computed: {
      ...mapState('users', ['followingList', 'followerList', 'hasMoreFollower', 'hasMoreFollowing'])
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
      },
      removeFollowing(id) {
        this.$store.dispatch('users/removeFollowing', { id })
      },
      removeFollower(id) {
        this.$store.dispatch('users/removeFollower', {id })
      },
      loadMoreFollowings() {
        this.$store.dispatch('users/loadFollowing')        
      },
      loadMoreFollowers() {
        this.$store.dispatch('users/loadFollower')
      }
    },
  }

</script>

<style>

</style>