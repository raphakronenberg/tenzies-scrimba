import { useState } from 'react'
import './App.css'
import Dice from "./components/Dice.jsx"

function App() {
  function generateListofDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 10) + 1,
      isHeld: false,
      id: crypto.randomUUID()
    }))
  }

  const [listOfDice, setListOfDice] = useState(generateListofDice)

  function hold(id) {
    setListOfDice(prevDice => prevDice.map(die => {
      return die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : die
    }))
  }
  function rollDice() {
    setListOfDice(prevDice => prevDice.map(die => {
      return die.isHeld
        ? die
        : { ...die, value: Math.floor(Math.random() * 10) + 1 }
    }))
  }

  function isFinished() {
    const allHeld = listOfDice.every(die => die.isHeld)

    const firstValue = listOfDice[0]
    const allSameValue = listOfDice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      console.log("You won!")
    }
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <span>Roll the dice until they are the same number. Click to lock in your value</span>

      <Dice listOfDice={listOfDice} hold={hold} />

      <button id="btn-roll" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
