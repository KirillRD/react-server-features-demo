"use client"

import { use } from "react"
import { Header } from "../ui/Header"

export const F1TeamsList = ({ f1TeamsPromise }) => {
  const f1Teams = use(f1TeamsPromise)

  return (
    <div>
      <Header>F1 teams</Header>
      {f1Teams.map(f1Team => <p key={f1Team.name}>{f1Team.name}</p>)}
    </div>
  )
}
