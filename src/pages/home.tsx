import React, { useEffect, useState } from "react";
import firebase from "../firebase-app";
import { SignInComponent } from "../components/sign-in";
import { ListComponent } from "../components/list";
import { AddComponent } from "../components/add";

const distractionsCol = firebase.firestore().collection("distractions");

export function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [distraction, setDistraction] = useState("");
  const [distractions, setDistractions] = useState<Array<{ name: string }>>([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
  }, [isSignedIn]);

  useEffect(() => {
    loadDistractions();
  }, [isSignedIn]);

  async function loadDistractions() {
    const user = firebase.auth().currentUser;
    if (isSignedIn && user) {
      const snapshot = await distractionsCol
        .where("user", "==", user.uid)
        .orderBy("created")
        .get();

      const data: any = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });

      setDistractions(data);
    }
  }

  async function save() {
    if (!distraction.length) return;

    const user = firebase.auth().currentUser;
    if (user) {
      await distractionsCol.add({
        name: distraction,
        user: user.uid,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });

      setDistraction("");
      setDistractions([...distractions, { name: distraction }]);
    }
  }

  return (
    <div className="container-fluid">
      {isSignedIn ? (
        <div>
          <AddComponent onSubmit={(data: any) => console.log(data)} />
          <a
            onClick={() => {
              firebase.auth().signOut();
              setIsSignedIn(false);
            }}
          >
            Signout
          </a>
          <ListComponent distractions={distractions} />
        </div>
      ) : (
        <SignInComponent />
      )}
    </div>
  );
}
