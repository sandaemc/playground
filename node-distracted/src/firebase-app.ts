import firebase from "firebase";

const projectId: string = process.env.REACT_APP_FIREBASE_PROJECT_ID || "";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId
};

firebase.initializeApp(config);

export default firebase;
