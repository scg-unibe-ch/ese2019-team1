# ese2019-team1

## Description
This project is an Event Management Platform. 

## Installation
Preliminary installations:
  Firebase environment either directly hosted on https://firebase.google.com
  or your own server environment via Firebase SDK kit https://firebase.google.com/docs/admin/setup
Deployment:
  First you need to enter your enviroments variables in {USER_HOME}/WebstormProjects/ese2019-team1/EMA/src/enviroment.prod.ts
  eg: 
  <pre><code>export const environment = {
  production: true,
  firebase: {
    apiKey: '{YOUR API KEY}',
    authDomain: '{YOUR DOMAIN}',
    databaseURL: 'https://{YOUR DOMAIN}.firebaseio.com',
    projectId: '{YOUR PROJECT}',
    storageBucket: '{YOUR DOMAIN}.appspot.com',
    messagingSenderId: '{SENDERID}',
    appId: '{APIID}',
    measurementId: '{MEASUSREMENTID}'

  }
};</code></pre>
  
   Once done, you can build the project via terminal input:
   <code> ng build --watch</code>
   and deploy to your firebase hosting via:
   <code> firebase deploy {build location}</code>

## Usage
xy

## Credits
Credits go to:
Adrian, Leila, Romana, Veronika and Joel.
