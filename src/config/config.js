import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCAkC4JOtjfWZTfGZT37X-HVHNNRjWODRM",
  authDomain: "notemaster-3ee26.firebaseapp.com",
  databaseURL: "https://notemaster-3ee26.firebaseio.com",
  projectId: "notemaster-3ee26",
  storageBucket: "notemaster-3ee26.appspot.com",
  messagingSenderId: "391356931679",
  appId: "1:391356931679:web:719468af6824f084"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
