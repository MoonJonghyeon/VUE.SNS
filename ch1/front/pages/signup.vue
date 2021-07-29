<template>
  <div>
    <v-container>
        <v-card>
            <v-container>
            <v-subheader>Signup</v-subheader>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-text-field 
                v-model="email"
                label="email"
                type="email"
                :rules="emailRules"
                required
                />
                <v-text-field 
                v-model="password"
                label="password"
                type="password"
                :rules="passwordRules"
                required
                />
                <v-text-field 
                v-model="passwordCheck"
                label="passwordCheck"
                type="passwordCheck"
                :rules="passwordCheckRules"
                required
                />
                <v-text-field 
                v-model="nickname"
                label="nickname"
                type="nickname"
                :rules="nicknameRules"
                required
                />
                <v-checkbox 
                v-model="terms"
                required
                :rules='[v => !!v || "약관에 동의해야해"]'
                label="I will follow Moon strictly"
                />
                <v-btn color="green" type="submit">
                    <div>register</div>
                </v-btn>
            </v-form>
            </v-container>
        </v-card>
    </v-container> 
  </div>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms: false,
        emailRules: [
          v => !!v || '이메일은 필수다',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않네?'
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수다',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수다',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수다',
          v => v === this.password || '비밀번호 일치 하지 않는다'
        ]
      }
    },
    methods: {
      onSubmitForm() {
        if(this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            email: this.email
          })
          .then(() => {
            this.$router.push({
            path: '/',
          })
          })
          .catch(() => {
            alert('회원가입 실패')
          })
        }
      }
    },
    head() {
      return {
        title : 'Signup'
      }
    }
  }

</script>

<style>

</style>