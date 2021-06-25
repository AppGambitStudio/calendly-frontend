import Amplify from 'aws-amplify'
import Vue from 'vue'
import App from './App.vue'
import router from './router';

// Cognito Configuration
const region = 'us-east-1';
const cognitoDomainName = 'calendly-app-dev'
const cognitoWebClientId = '4a8m7vp5blh1oioleuq4k16uoj';
const cognitoPoolId = "us-east-1_5BAT5PdqF";
const cloudfrontUrl = "https://d2a2u5lg9yzpdp.cloudfront.net";
const graphQlEndpoint = 'https://6boiwtrd2ba3dpkofo5zfsf7p4.appsync-api.us-east-1.amazonaws.com/graphql';
const apiGatewayEndpoint = "https://duk3flydp6.execute-api.us-east-1.amazonaws.com/dev";

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
        "redirectSignIn": cloudfrontUrl,
        "redirectSignOut": cloudfrontUrl,
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

