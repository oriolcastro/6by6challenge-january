[![Netlify Status](https://api.netlify.com/api/v1/badges/0718f5ac-9a2e-44e6-a89f-6f97fc12cc60/deploy-status)](https://app.netlify.com/sites/pastanagapp-6by6january/deploys)

<p align="center">
    <img alt="Gatsby" src="./src/images/pastanagapp.png" />
</p>

This is the january's (and also february) project from 6by6 challenge (no english article yet).

### 🧬 Tech stack

**Front end**

- [Gatbsby](https://www.gatsbyjs.com/) as the main framework to develop the app using [Reactjs](https://reactjs.org/).
- [Apollo](https://github.com/apollographql/apollo-client) to query the GraphQL endpoint.
- [Material-ui](https://github.com/mui-org/material-ui) as the UI component library.
- [FirebaseJS](https://github.com/firebase/firebase-js-sdk) to receive the push notifications.
- [Auth0JS](https://github.com/auth0/auth0.js) as the toolkit to manage authority in the client.

**Back end**

- [Hasura](https://github.com/hasura/graphql-engine) engine deployed to Heroku.
- [Hasura Event Triggers](https://hasura.io/event-triggers) allow us to trigger the lambda functions after changes in the database.
- The webapp is deployed to [Netlify's](https://www.netlify.com/) CDN.
- [Netlify Functions](https://www.netlify.com/features/functions/) manage all the server logic.
- [Auth0](https://auth0.com/) is the identity service selected to control the access to the web app.
- [Firebase Cloud Messaging](https://firebase.google.com/products/cloud-messaging/) is used to send push notifications to the users through a lambda function.
- [SendGrid](https://sendgrid.com/) is the service used to send automatic emails to the users.

### 🧪 Demo
Not working. The deployed demo has the backend offline.

~~Acces the demo [here](https://www.lapastanagadelrei.cat).~~

~~- User: demopastanaga@gmail.com~~
~~- Password: demopastanaga~~
