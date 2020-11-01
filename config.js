import * as firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBLMFS6RQ79jb1w--3jKYebOnzhNVAGl90",
  authDomain: "item-finder-bdbc0.firebaseapp.com",
  databaseURL: "https://item-finder-bdbc0.firebaseio.com",
  projectId: "item-finder-bdbc0",
  storageBucket: "item-finder-bdbc0.appspot.com",
  messagingSenderId: "540390327113",
  appId: "1:540390327113:web:24286cc530067ba4665098"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();