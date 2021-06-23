<template>        
    <div class="content">
        <nav class="panel">
            <p class="panel-heading">
                Sessions
            </p>            
            <div class="panel-block" v-if="!loading">
                <div v-for="session in sessions" v-bind:key="session.id">
                    <div>{{ session.contactName }}</div>
                    <div>{{ session.contactEmail }}</div>
                    <div>{{ session.sessionTime }} </div>
                    <div>{{ session.duration }}</div>
                    <div>{{ session.userTimezone }}</div>
                    <div>
                        <router-link :to="{ path: '/', query: { user: 'dhaval-nagar', event: '15min' }}" >
                            Open
                        </router-link>
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
const data = {
    loading: false,
    sessions: []
}
export default {
    name: 'UserSessions',
    data() {
        data.sessions = []
        data.loading = true;
        getMySessions("2021-06-01", "2021-07-01")
        .then(sessions => { 
            data.loading = false;           
            data.sessions = data.sessions.concat(sessions);            
        })
        return data
    }
}
</script>
