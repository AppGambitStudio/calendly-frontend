<template>
    <div class="content" v-if="!loading">
        <div class="block">
            <h1 class="title">Welcome, {{ email }}</h1>
        </div>
        <div class="block">
            <span class="tag is-link" v-if="hasLink">
                {{ host }}{{ link }}
            </span>
            <span class="notification is-danger" v-if="!hasLink">
                <strong>You haven't saved your profile link yet.</strong>
            </span>
        </div>
        <div class="block" v-if="hasSchedule">
            Working Hours - {{ schedule.startHour }}:00 - {{ schedule.endHour }}:00
        </div>
        <div class="block" v-if="hasSchedule">
            <div class="field has-addons">
                <p class="control" >
                    <button class="button" v-bind:class="{ 'is-primary': schedule.mon }">
                    <span>Mon</span>
                    </button>
                </p>
                <p class="control" >
                    <button class="button" v-bind:class="{ 'is-primary': schedule.tue }">
                    <span>Tue</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button " v-bind:class="{ 'is-primary': schedule.wed }">
                    <span>Wed</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button" v-bind:class="{ 'is-primary': schedule.thu }">
                    <span>Thu</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button" v-bind:class="{ 'is-primary': schedule.fri }">
                    <span>Fri</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button" v-bind:class="{ 'is-primary': schedule.sat }">
                    <span>Sat</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button" v-bind:class="{ 'is-primary': schedule.sun }">
                    <span>Sun</span>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { getMyProfile } from '../api';

const data = { 
    hasLink: false,
    hasSchedule: false,
    email: '', link: '', schedule: {},
    host: window.location.href,
    loading: false    
};
export default {
    name: 'UserProfile',
    filters: {
        ampm: function(val) {
            
        }
    },
    data() {
        data.loading = true;
        getMyProfile()
        .then(profile => {
            data.hasLink = profile.hasLink
            data.hasSchedule = profile.hasSchedule
            data.email = profile.email;
            data.link = profile.link;
            data.schedule = profile.schedule;
            data.loading = false;
        });

        return data;
    }
}
</script>
