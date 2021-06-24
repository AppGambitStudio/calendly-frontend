<template>        
    <div class="content">
        <nav class="panel">
            <p class="panel-heading">
                Saved Events
            </p>            
            <div class="panel-block" v-if="!loading && events.length > 0">
                <div v-for="event in events" v-bind:key="event.id">
                    <div><router-link :to="{ path: '/', query: { user: 'dhaval-nagar', event: event.shortName }}" >{{ event.shortName }}</router-link> / {{ event.eventName }}</div>                    
                    <div>Duration: {{ event.duration }} Min</div>
                    Share <span class="tag is-primary">
                        <router-link :to="{ path: '/', query: { user: 'dhaval-nagar', event: event.shortName }}" >{{ event.shortName }}</router-link>
                    </span>
                </div>
            </div>
            <div class="panel-block" v-if="!loading && events.length <= 0">
                No Events Created
            </div>
            <div class="panel-block" v-if="loading">
                loading events...                
            </div>
        </nav>            
    </div>    
</template>

<script>
import { getMyEvents } from '../api';
const data = {
    loading: false,
    events: []
}
export default {
    name: 'UserEvents',
    data() {
        data.events = []
        data.loading = true
        getMyEvents()
        .then(events => {      
            data.loading = false;      
            data.events = data.events.concat(events);            
        })
        return data
    }
}
</script>
