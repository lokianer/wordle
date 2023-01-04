import React from 'react'

export default function Modal({ word, isCorrect, turn }) {
    let link = `https://www.duden.de/suchen/dudenonline/${word}`;
    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <h1>Gratulation!</h1>
                    <p className='solution'>{word.toUpperCase()}</p>
                    <p>Anzahl der Versuche: {turn}</p><br />
                    <a href={link} target="_blank" rel="noreferrer">Du kennst das Wort nicht? Schlage hier nach</a>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Verloren!</h1>
                    <p className='solution'>{word.toUpperCase()}</p>
                    <p>Anzahl der Versuche: {turn}</p><br />
                    <a href={link} target="_blank" rel="noreferrer">Du kennst das Wort nicht? Schlage hier nach</a>
                </div>
            )}
        </div>
    )
}
