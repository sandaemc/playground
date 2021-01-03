require("dotenv").config();
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
});

const uiConfig = {
  signInFlow: "redirect",
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

console.log("Calling firebase app");
