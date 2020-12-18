import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAZVjjs1hsc4yTiQqSu08xqjaX9ESb5MZ8",
    authDomain: "scannerfriends-6f072.firebaseapp.com",
    projectId: "scannerfriends-6f072",
    storageBucket: "scannerfriends-6f072.appspot.com",
    messagingSenderId: "821515672431",
    appId: "1:821515672431:web:5fada0402656fe0f38669a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
    firebase,
    db
}