import React, { useEffect, useState } from "react";
import firebase from "../firebase-app";
import { SignInComponent } from "../components/sign-in";

export function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
  }, [isSignedIn]);

  return (
    <>
      {isSignedIn ? (
        <div>
          <a
            onClick={() => {
              firebase.auth().signOut();
              setIsSignedIn(false);
            }}
          >
            Signout
          </a>
        </div>
      ) : (
        <SignInComponent />
      )}
    </>
  );
}
