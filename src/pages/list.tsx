import React, { useEffect, useState } from "react";
import firebase from "../firebase-app";
import { useAuth } from "../hooks/use-auth";
import { ListComponent } from "../components/list";

const distractionsCol = firebase.firestore().collection("distractions");

export function ListPage() {
  const user = useAuth();

  const [distractions, setDistractions] = useState<Array<{ name: string }>>([]);

  useEffect(() => {
    if (user) loadDistractions(user);
  }, [user]);

  async function loadDistractions(user: any) {
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

  return <ListComponent distractions={distractions} />;
}
