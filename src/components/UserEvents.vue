<template>        
    <div class="content">
        <nav class="panel">
            <p class="panel-heading">
                Events
            </p>            
            <div class="panel-block" v-if="!loading">
                <div v-for="event in events" v-bind:key="event.id">
                    <div>{{ event.shortName }}</div>
                    <div>{{ event.eventName }}</div>
                    <div>Duration {{ event.duration }} Min</div>
                </div>
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
