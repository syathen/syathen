import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const currentUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PUBLIC_DATABASE_URL,
  projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_APP_ID,
  measurementId: process.env.REACT_APP_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const databaseRef = app.database().ref();
// export const docsRef = databaseRef.child("docs");

export default firebase;
