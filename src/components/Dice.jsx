import React from "react"

export default function Dice({listOfDice, hold}){

  return (
    <div className="dice-container">
    
    {listOfDice.map(die => {
                // Inline conditional background color
                const style = {
                    backgroundColor: die.isHeld ? "#59E391" : "#FFFFFF"
                }

                return (
                    <button 
                        key={die.id} 
                        style={style}
                        className="die-btn"
                        onClick={() => hold(die.id)}
                    >
                        {die.value}
                    </button>
                )
            })}

    </div>
  )
}