import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config={
    apiKey: "AIzaSyARoy32T9aZThY4-TfQAh-bmTJN4g3e7t4",
    authDomain: "bhulx-b3ee4.firebaseapp.com",
    databaseURL: "https://bhulx-b3ee4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bhulx-b3ee4",
    storageBucket: "bhulx-b3ee4.appspot.com",
    messagingSenderId: "810202105314",
    appId: "1:810202105314:web:865c78978cfbd2500765bb"
};
const app = firebase.initializeApp(config);
export default app