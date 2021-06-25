import Amplify from 'aws-amplify'
import config from './aws-exports'
import Vue from 'vue'
import App from './App.vue'
import router from './router';

// Cognito Configuration
const region = 'us-east-1';
const cognitoDomainName = 'calendly-app-dev'
const cognitoWebClientId = '3cphtg41opguo8k9tlngh7rere';
const cognitoPoolId = "us-east-1_1QmQNWNcM";
const graphQlEndpoint = 'https://yxjzvkixbbarpjf33tojpu3hiq.appsync-api.us-east-1.amazonaws.com/graphql';
const apiGatewayEndpoint = "https://9z92rh38j9.execute-api.us-east-1.amazonaws.com/dev";

const cognito = {
    "aws_project_region": region,
    "aws_cognito_region": region,
    "aws_user_pools_id": cognitoPoolId,
    "aws_user_pools_web_client_id": cognitoWebClientId,
    "oauth": {
        "domain": `${cognitoDomainName}.auth.${region}.amazoncognito.com`,
        "scope": [
            "email",
            "openid",
            "profile"
        ],
        "redirectSignIn": "http://localhost:8080",
        "redirectSignOut": "http://localhost:8080",
        "responseType": "token"
    },
    "federationTarget": "COGNITO_USER_POOLS"    
};

Amplify.configure(cognito)

// AppSync Endpoint Configuration
const myAppConfig = {
    'aws_appsync_graphqlEndpoint': graphQlEndpoint,
    'aws_appsync_region': region,
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}
  
Amplify.configure(myAppConfig);

// API Gateway Endpoint Configuration
Amplify.configure({
    API: {
        endpoints: [
            {
                name: "CalendlyPublicAPI",
                endpoint: apiGatewayEndpoint
            }
        ]
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

