<template>
    <section class="">
        <div class="container">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item" href="https://bulma.io" style="font-size: 2rem;">
                        <strong>Calendly Clone</strong>
                    </div>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">                        
                        
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-primary" v-if="!login" v-on:click="doLogin">
                                    <strong>Log in</strong>
                                </a>
                                <a class="button is-primary" v-if="login" v-on:click="doSignout">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="columns">
                <div class="column is-full">
                    <div class="notification is-info">
                        This is a <strong>demo</strong> <em>application</em> built to showcase the amazing AWS Serverless services. For the original <code>Calendly</code> go <a href="https://calendly.com" target="_blank">here</a>.
                    </div>
                </div>
            </div>

            <div class="block" v-if="login && isPrivate">
                <UserProfile />           
                <UserEvents />
                <UserSessions />
            </div>
            
            <div class="block" v-if="!isPrivate">
                Loading User Info and Event Booking UI 
                <strong>{{ user }}/{{ event }}</strong>
            </div>

            <div class="columns" style="padding-top: 50px;" v-if="!login" >
                <div class="column is-half">
                    <div class="block" style="">
                        <div style="font-size: 7rem; font-weight: bold; line-height: 100px;">Easy scheduling <span style="color: rgb(0, 107, 255);">ahead</span></div>                
                    </div>
                </div>
                <div class="column">
                    <figure class="image ">
                        <img src="../assets/home-image.png">
                    </figure>
                </div>                                
            </div>                    

            <nav class="level" v-if="!login">
                <div class="level-item has-text-centered">
                    <div>                    
                    <p class="title">Login</p>
                    <p class="heading">Signup and Login to your account</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>                    
                    <p class="title">Schedule</p>
                    <p class="heading">Setup your work days and work hours.</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>                    
                    <p class="title">Events</p>
                    <p class="heading">Create events of the choice of your duration.</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                    <p class="title">Share</p>
                    <p class="heading">Share your events link with others</p>
                    </div>
                </div>                
            </nav>            

            <div class="block">
                <div class="box">
                    For the full source code please go <a href="https://github.com/AppGambitStudio" class="link" target="_blank">here</a>.
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import UserProfile from '../components/UserProfile.vue'
    import UserLink from '../components/UserLink.vue'
    import UserEvents from '../components/UserEvents.vue'
    import UserSessions from '../components/UserSessions.vue'

    import { Hub, Auth, API } from 'aws-amplify'
    
    const state = { login: false };    


    Auth.currentAuthenticatedUser()
    .then(user => {
        state.login = true;
    });    

    export default {
        name: 'Home',
        components: {
            UserLink,
            UserProfile,
            UserEvents,
            UserSessions
        },
        data() {
            const queryParams = this.$route.query;
            if(queryParams.user && queryParams.event){
                state.isPrivate = false;
                state.user = queryParams.user
                state.event = queryParams.event
            }else{
                state.isPrivate = true;
            }
            return state
        },
        methods: {
            doSignup() {
                Auth.federatedSignIn();
            },
            doLogin(){
                Auth.federatedSignIn();
            },
            doSignout(){
                Auth.signOut();
            }
        }        
    }
</script>