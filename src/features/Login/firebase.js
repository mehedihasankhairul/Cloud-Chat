import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDD41_QuWBBbMMAN77uomLPi9KIv0FBYVA",
    authDomain: "cloud-chat-950ee.firebaseapp.com",
    projectId: "cloud-chat-950ee",
    storageBucket: "cloud-chat-950ee.appspot.com",
    messagingSenderId: "971981634931",
    appId: "1:971981634931:web:7364db83b3a27073cb5906"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const dataBase = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default dataBase;