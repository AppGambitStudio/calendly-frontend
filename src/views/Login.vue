<template>
    <div class="buttons">
        <button class="button is-primary" v-on:click="doLogin" v-if="!login">Login</button>
        <button class="button " v-on:click="doLogout" v-if="login">Logout</button>
    </div>
</template>

<script>
    export default {
        name: 'LogIn',
        data() {
            return {
                login: false
            }
        }
    }
</script>