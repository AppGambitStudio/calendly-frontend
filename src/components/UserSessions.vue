<template>        
    <div class="content">
        <nav class="panel">
            <p class="panel-heading">
                Sessions
            </p>            
            <div class="panel-block" v-if="!loading">                
                <div class="block">
                <div class="select">
                    <select v-model="currentYear" v-on:change="yearChanged($event)">
                        <option v-for="year in years" :value="year.num" v-bind:key="year.num">{{year.value}}</option>
                    </select>
                </div>
                <div class="select">
                    <select v-model="currentMonth" v-on:change="monthChanged($event)">
                        <option v-for="month in months" :value="month.num" v-bind:key="month.num">{{month.value}}</option>
                    </select>
                </div>
                </div>
            </div>
            <div class="panel-block" v-if="!loading">                
                <div class="block">
                    <div v-for="session in sessions" v-bind:key="session.id">
                        <div><strong>{{ session.contactName }}</strong></div>
                        <div>{{ session.contactEmail }}</div>
                        <div>{{ session.sessionTime | moment }} for {{ session.duration }} Minutes ({{ session.userTimezone }})</div>                        
                    </div>
                </div>                    
            </div>
            <div class="panel-block" v-if="loading">
                loading sessions...
            </div>
        </nav>            
    </div>    
</template>

<script>
import { getMySessions } from '../api';
import moment, { months } from 'moment-timezone';

const data = {
    loading: false,
    sessions: [],
    selectYear: moment().format('YYYY'),
    selectMonth: moment().format('MM'),
    currentMonth: moment().format('MM'),
    currentYear: moment().format('YYYY'),
    years: [
        {num: '2021', value: '2021'}
    ],
    months: [
        {num:'01',value: 'Jan'},
        {num:'02',value: 'Feb'},
        {num:'04',value: 'Mar'},
        {num:'04',value: 'Apr'},
        {num:'05',value: 'May'},
        {num:'06',value: 'Jun'},
        {num:'07',value: 'Jul'},
        {num:'08',value: 'Aug'},
        {num:'09',value: 'Sep'},
        {num:'10',value: 'Oct'},
        {num:'11',value: 'Nov'},
        {num:'12',value: 'Dec'}
    ]
}

function loadMonthSessions(){
    const startDate = `${data.currentYear}-${data.currentMonth}-01`;
    const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');

    data.sessions = [];
    getMySessions(startDate, endDate)
    .then(sessions => { 
        data.loading = false;           
        data.sessions = data.sessions.concat(sessions);
    })
}
export default {
    name: 'UserSessions',
    filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD, h:mm:ss a');
        }
    },
    methods: {
        monthChanged: function(event){            
            loadMonthSessions()
        },
        monthChanged: function(event){            
            loadMonthSessions()
        }
    },
    data() {
        data.sessions = []
        data.loading = true;
        this.$nextTick( function() {
            loadMonthSessions(this.$data.selectYear, this.$data.selectMonth);
        })        
        return data
    }
}
</script>
