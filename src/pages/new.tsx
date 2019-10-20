import React, { useState } from "react";
import { AddComponent } from "../components/add";
import firebase from "../firebase-app";

const distractionsCol = firebase.firestore().collection("distractions");

export function NewPage() {
  const [distraction, setDistraction] = useState("");

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
    }
  }

  return <AddComponent onSubmit={(data: any) => console.log(data)} />;
}
