<template>    
    <section class="" >
        <div class="container" v-if="showUserEvent">

            <div class="columns">
                <div class="column is-full">
                    <div class="notification is-info">
                        This is a <strong>demo</strong> <em>application</em> built to showcase the amazing AWS Serverless services. For the original <code>Calendly</code> go <a href="https://calendly.com" target="_blank">here</a>.
                    </div>
                </div>
            </div>

            <div class="block" v-if="!loading && !userFound">
                <div class="notification is-danger">
                    <strong>No User Found</strong>
                </div>
            </div>

            <div class="block" v-if="userFound">
                <div class="block" v-if="user">
                    <section class="hero">
                        <div class="hero-body">
                            <p class="title">
                            {{ user.email }}
                            </p>
                            <p class="subtitle">
                            Please book your session.
                            </p>
                        </div>
                    </section>
                </div>

                <div class="hero-body columns">
                    <div class="column">
                        <div class="block">
                            <strong>Book Your Session</strong>
                            <div class="block">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Your name" v-model="contactName">
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="email" placeholder="Email" v-model="contactEmail">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Session Date/Time</label>
                                    <div class="control">
                                        <input class="input" type="date" v-model="contactDate">
                                        <input class="input" type="time" v-model="contactTime">
                                    </div>
                                </div>
                                <div class="control">
                                    <button class="button is-link" v-on:click="callBookSession">Book</button>
                                </div>
                            </div>
                            <div class="block" v-if="showBooking">
                                <div class="block notification is-primary" v-if="bookingDone">
                                    Your session is booked.
                                </div>
                                <div class="block notification is-danger" v-if="!bookingDone">
                                    Failed to book the session. Please check for the Booked Timeslots. 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="block">
                            <strong>Blocked Timeslots</strong>
                            <div v-for="schedule in currentSchedule" v-bind:key="schedule.sessionTime">
                                {{ schedule.sessionTime | moment }} for {{ schedule.duration}} Minutes
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>

        <div class="container" v-if="!showUserEvent">
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

            <div class="block" v-if="login">
                <UserProfile />           
                <UserEvents />
                <UserSessions />
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
    import moment from 'moment-timezone';

    import { Hub, Auth, API } from 'aws-amplify'
    
    const state = { 
        login: false, 
        showUserEvent: false,
        userFound: false,
        contactName: '',
        contactEmail: '',
        contactDate: '',
        contactTime: '',
        user: {},
        currentSchedule: [],

        hasLink: false,
        loading: false,
        userFound: false,

        showBooking: false,
        bookingDone: false,
        bookingError: ''
    };    

    import { getUserInfo, getUserSchedule, bookSession } from '../api';

    Auth.currentAuthenticatedUser()
    .then(user => {
        state.login = true;        
    });

    export default {
        name: 'Home',
        filters: {
            moment: function (date) {
                return moment(date).format('YYYY/MM/DD, h:mm:ss a');
            }
        },
        components: {
            UserLink,
            UserProfile,
            UserEvents,
            UserSessions
        },
        data() {
            this.$nextTick( function() {
                const queryParams = this.$route.query;
                if(queryParams.user && queryParams.event){
                    state.showUserEvent = true;
                    state.user = queryParams.user
                    state.event = queryParams.event

                    state.userFound = false;
                    state.loading = true;
                    getUserInfo(state.user)
                    .then(userInfo => {
                        
                        if(userInfo && userInfo.id){
                            
                            state.userFound = true;                            
                            state.user = userInfo;
                            state.contactName = "";
                            state.contactEmail = "";
                            state.hasLink = userInfo.hasLink;
                            getUserSchedule(userInfo.id, moment().format('YYYY'), moment().format('M'))
                            .then(schedule => {
                                state.loading = false;
                                console.log(schedule)
                                state.currentSchedule = schedule;
                            })
                        }else{
                            state.userFound = false;
                            state.loading = false;
                        }                   
                    })                
                }else{
                    state.showUserEvent = false;
                }
            });            
            return state
        },
        methods: {
            callBookSession() {
                console.log(this.$data.contactDate);
                console.log(this.$data.contactTime);
                const contactDateTime = moment(this.$data.contactDate + " " + this.$data.contactTime).format();
                
                bookSession({
                    "id": `${this.$data.user.id}`,
                    "name": `${this.$data.contactName}`,
                    "email": `${this.$data.contactEmail}`,
                    "sessionTime": contactDateTime,
                    "duration": 30,
                    "timezone": moment.tz.guess()
                }).then(res => {
                    this.$data.showBooking = true;
                    this.$data.bookingDone = true;
                }).catch(err => {
                    console.log(err);
                    this.$data.showBooking = true;
                    this.$data.bookingDone = false;
                    this.$data.bookingError = err.message;
                });
            },
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