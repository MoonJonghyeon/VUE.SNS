<template>
    <v-container v-if="!me">
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container>
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
                    <v-btn color="green" type="submit" :disabled= "!valid">Login</v-btn>
                    <v-btn nuxt to="/signup">Signup</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card>
            {{ me.nickname }}로그인됬다
            <v-btn @click="onLogOut">
                로그아웃
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return{
            email: '',
            password: '',
            valid: false,
            emailRules: [
          v => !!v || '이메일은 필수다',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않네?'
        ],
            passwordRules: [
          v => !!v || '비밀번호는 필수다',
        ],
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        }
    },
    methods: {
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('users/logIn', {
                    email: this.email,
                    nickname: '똥쟁이',
                })
            };
        },
        onLogOut() {
            this.$store.dispatch('users/logOut')
        }
    },
}
</script>

<style>

</style>