import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "../firebase-app";
import { useHistory } from "react-router-dom";

const defaultContext = {
  user: undefined,
  signOut: () => Promise.resolve()
};

const authContext = createContext(defaultContext);

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState();
  const history = useHistory();

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        history.replace("/");
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signOut
  };
}
