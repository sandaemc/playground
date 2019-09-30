import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};

firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const observer = firebase.auth().onAuthStateChanged( (user: any) => setIsSignedIn(!!user))
  }, [isSignedIn]);

  return (
    <div>
      <h1>My App</h1>
      <p>{ isSignedIn ? "Sign-out" : "Sign-in" }</p>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
