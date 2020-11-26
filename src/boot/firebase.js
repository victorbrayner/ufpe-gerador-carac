import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// 'async' is optional
export default async ({ Vue }) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDKwUa_A-u7eTkuqZaBgYp7d1JliM2Zs0M',
    authDomain: 'trustedfeed-2014.firebaseapp.com',
    databaseURL: 'https://trustedfeed-2014.firebaseio.com',
    projectId: 'trustedfeed-2014',
    storageBucket: 'trustedfeed-2014.appspot.com',
    messagingSenderId: '532970336249',
    appId: '1:532970336249:web:aff29b77ad9df794df1728'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().languageCode = 'pt';

  Vue.prototype.$auth = firebase.auth;
  Vue.prototype.$database = firebase.database;
};
