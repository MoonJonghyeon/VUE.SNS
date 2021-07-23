<template>
    <v-container>
        <v-card>
            <v-form>
                <v-container>
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
                    <v-btn color = 'green' type = 'submit'>Login</v-btn>
                    <v-btn nuxt to = '/signup'>Signup</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>