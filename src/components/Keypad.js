import React from 'react'

export default function Keypad({usedKeys}) {
    const keypad = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ]
  return (
    <div className='keypad'>
        {keypad && keypad.map((letter, index) => {
          const color = usedKeys[letter]

            return <div key={index} className={color}>{letter}</div>
        })}
    </div>
  )
}
