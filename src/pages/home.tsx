import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/use-auth"
import { ListComponent } from "../components/list"
import firebase from "../firebase-app"

const distractionsCol = firebase.firestore().collection("distractions")

export function HomePage() {
  const auth = useAuth()

  const [distractions, setDistractions] = useState<Array<{ name: string }>>([])

  useEffect(() => {
    if (auth.user) loadDistractions(auth.user)
  }, [auth.user])

  async function loadDistractions(user: any) {
    const snapshot = await distractionsCol
      .where("user", "==", user.uid)
      .orderBy("created")
      .get()

    const data: any = []
    snapshot.forEach(doc => {
      data.push(doc.data())
    })

    setDistractions(data)
  }

  return auth.user ? (
    <ListComponent distractions={distractions} />
  ) : (
    <div>Home page</div>
  )
}
