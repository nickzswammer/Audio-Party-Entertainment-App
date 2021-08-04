import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDxo4Y_9dF-VU7ePzyzok_QNfsF8KgykxY",
  authDomain: "audioparty-7a25e.firebaseapp.com",
  projectId: "audioparty-7a25e",
  storageBucket: "audioparty-7a25e.appspot.com",
  messagingSenderId: "282519798145",
  appId: "1:282519798145:web:58c57fd701c7925a44a880",
  measurementId: "G-Q7BZ24Z0V3",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
