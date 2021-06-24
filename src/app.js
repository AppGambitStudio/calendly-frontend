import Amplify from 'aws-amplify'
import config from './aws-exports'
import Vue from 'vue'
import App from './App.vue'
import router from './router';

Amplify.configure(config)

// AppSync Endpoint Configuration
const myAppConfig = {
    'aws_appsync_graphqlEndpoint': 'https://5fdb3v5kwjdo3geav3jobppcte.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}
  
Amplify.configure(myAppConfig);

// API Gateway Endpoint Configuration
Amplify.configure({
    API: {
        endpoints: [
            {
                name: "CalendlyPublicAPI",
                endpoint: "https://xwo89o6i54.execute-api.us-east-1.amazonaws.com/dev"
            }
        ]
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

