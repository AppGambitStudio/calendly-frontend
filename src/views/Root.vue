<template>
    <div class="container" id="app">
        <h1 class="title">
            Calendly App with Amazon AppSync
        </h1>
                      
        <div class="buttons" v-if="login">
            <button class="button is-primary" v-on:click="myProfile">Get My Profile</button>
        </div>

        <div v-if="profile">
            <p v-if="profile.hasLink">{{ profile.link }}</p>
            <button v-if="!profile.hasLink" class="button">Set Link</button>
            <p v-if="profile.hasSchedule">
                {{ profile.schedule }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Root',
        data() {
            return {
                name: '',
                email: ''
            }
        }
    }
</script>