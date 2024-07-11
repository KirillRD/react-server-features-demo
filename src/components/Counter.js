"use client"

import { useState } from "react"
import { Header } from "./ui/Header"

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <button onClick={handleClick}>
      <Header>You pressed me {count} times</Header>
    </button>
  )
}
