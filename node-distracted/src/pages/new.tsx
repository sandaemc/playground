import React, { useState } from "react"
import { AddComponent } from "../components/add"
import firebase from "../firebase-app"
import { useLocation, Redirect } from "react-router"
import { useAuth } from "../hooks/use-auth"

const distractionsCol = firebase.firestore().collection("distractions")

export function NewPage() {
  const auth = useAuth()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const from = location.search ? new URL(params.get("from") || "").hostname : ""

  const [distraction, setDistraction] = useState(from)

  async function save(data: any) {
    if (!distraction.length) return

    const tags = Object.keys(data)
      .filter(c => c.startsWith("tag-"))
      .map(c => data[c])
      .filter(c => c)

    const user = firebase.auth().currentUser
    if (user) {
      await distractionsCol.add({
        name: distraction,
        user: user.uid,
        tags,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })

      setDistraction("")
    }
  }

  return auth.user ? (
    distraction.length ? (
      <AddComponent distraction={distraction} onSubmit={save} />
    ) : (
      <Redirect to="/" />
    )
  ) : null
}
