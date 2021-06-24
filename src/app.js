import Amplify from 'aws-amplify'
import config from './aws-exports'
import Vue from 'vue'
import App from './App.vue'
import router from './router';
// import { Hub, Auth, API } from 'aws-amplify'

Amplify.configure(config)

const myAppConfig = {
    'aws_appsync_graphqlEndpoint': 'https://5fdb3v5kwjdo3geav3jobppcte.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}
  
Amplify.configure(myAppConfig);

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

// const appData = {
//     login: false,
//     init: true,
//     profile: false    
// };

// var app = new Vue({
//     el: '#app',
//     data: appData,
//     methods: {
//         doLogin: async (event) => {            
//             Auth.federatedSignIn();
//         },
//         doLogout: () => {
//             Auth.signOut();
//         },
//         myProfile: async () => {
//             const profile = await getMyProfile();
//             appData.profile = profile;
//             console.log(profile);
//         }
//     }
// });

// window.setup = async () => {
//     Auth.currentAuthenticatedUser()
//     .then(user => {
//         appData.init = false;
//         appData.login = true;
//     })
//     .catch(err => {
//         appData.init = false;
//         appData.login = false;
//     });
// }

// Hub.listen('auth', (data) => {
//     switch (data.payload.event) {
//         case 'signIn':
//             appData.init = false;
//             appData.login = true;
//             break;
//       case 'signUp':
//           console.log('user signed up', data.payload);
//           break;
//       case 'signOut':
//           console.log('user signed out');
//           break;
//       case 'signIn_failure':
//           console.log('user sign in failed');
//           break;
//       case 'configured':
//           console.log('the Auth module is configured');
//     }
// });

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

