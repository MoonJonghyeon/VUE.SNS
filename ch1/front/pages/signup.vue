<template>
  <div>
    <v-container>
        <v-card>
            <v-container>
            <v-subheader>Signup</v-subheader>
            <v-form>
                <v-text-field 
                label = 'email'
                type = 'email'
                required
                />
                <v-text-field 
                label = 'password'
                type = 'password'
                required
                />
                <v-text-field 
                label = 'passwordCheck'
                type = 'passwordCheck'
                required
                />
                <v-text-field 
                label = 'nickname'
                type = 'nickname'
                required
                />
                <v-checkbox 
                required
                label = 'I will follow Moon strictly'
                />
                <v-btn color = 'green'>
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
        name:'Nuxt.js',
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