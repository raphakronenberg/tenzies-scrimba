import { useState } from 'react'
import './App.css'
import Dice from "./components/Dice.jsx"
import Confetti from "react-confetti"

function App() {
  function generateListofDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 6) + 1, // Standard dice 1-6
      isHeld: false,
      id: crypto.randomUUID()
    }))
  }

  const [listOfDice, setListOfDice] = useState(generateListofDice)

  // Check winning condition
  const gameWon = listOfDice.every(die => die.isHeld) &&
    listOfDice.every(die => die.value === listOfDice[0].value)

  function hold(id) {
    setListOfDice(prevDice => prevDice.map(die => {
      return die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : die
    }))
  }

  function rollDice() {
    if (gameWon) {
      setListOfDice(generateListofDice())
    } else {
      setListOfDice(prevDice => prevDice.map(die => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      }))
    }
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <Dice listOfDice={listOfDice} hold={hold} />

      <button className="btn-primary" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App