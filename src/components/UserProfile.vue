<template>
    <div class="content" v-if="!loading">
        <div class="block">
            <h1 class="title">Welcome, {{ email }}</h1>
        </div>
        <div class="block">
            Share your link - 
            <span class="tag is-link">
                https://mycalendly.com/{{ link }}
            </span>
        </div>
        <div class="block">
            Start Time {{ schedule.startHour }} End Time {{ schedule.endHour }}
        </div>
        <div class="block">
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
import { getMyProfile } from '../api';

const data = { 
    email: '', link: '', schedule: {},
    loading: false
};
export default {
    name: 'UserProfile',
    data() {
        data.loading = true;
        getMyProfile()
        .then(profile => {
            data.email = profile.email;
            data.link = profile.link;
            data.schedule = profile.schedule;
            data.loading = false;
        });

        return data;
    }
}
</script>
