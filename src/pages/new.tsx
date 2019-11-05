import React, { useState } from "react";
import { AddComponent } from "../components/add";
import firebase from "../firebase-app";
import { RouteComponentProps, Redirect } from "react-router";
import { useAuth } from "../hooks/use-auth";

const distractionsCol = firebase.firestore().collection("distractions");

export function NewPage({ location }: RouteComponentProps) {
  const auth = useAuth();

  /*
  const params = new URLSearchParams(location.search);
  const from = new URL(params.get("from") || "");
  console.log(params.get("from"));
  console.log(from);
  */

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

  return auth.user ? (
    <AddComponent onSubmit={(data: any) => console.log(data)} />
  ) : null;
}
