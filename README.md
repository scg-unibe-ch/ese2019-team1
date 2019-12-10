# ese2019-team1

## Description
This project is an Event Management Platform. Choose between several types of service providers such as venue owners, photographers, musicians, caterers and others to plan your perfect event! Or grow your business. Register now and make a profile to offer your services as provider.

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
 
 Create site admin-user:
    to create an admin user, just go to the site and register as regular user. Now you need to change into the database
    console of the firestore. you will find one entry under 'UserDB' which is your user ID. Click on your UserID and set 
    manualy a flag <code>isAdmin: true</code>.
    Congratulation, your user is has now site-admin rights.
    
 

## Usage
Once you have installed our project, you can directly register yourself and get started.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Documentation
You can find our project documentation on https://github.com/scg-unibe-ch/ese2019-team1 in our wiki.

## Credits
Credits go to: Adrian, Joel, Veronika, Leila and Romana.
And of course credits go to our Professor Nierstrasz and our assistant Nitish Patkar.
