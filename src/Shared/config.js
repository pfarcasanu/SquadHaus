require('dotenv');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'squadhaus.firebaseapp.com',
  databaseURL: 'https://squad-haus.firebaseio.com',
  projectId: 'squad-haus',
  storageBucket: 'squad-haus.appspot.com',
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(config);

export default config;
