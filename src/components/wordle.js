import useWordle from '../hooks/useWordle'
import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ word, wordlist }) {
    const {currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys, showModal} = useWordle(word, wordlist);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        if(isCorrect){
          window.removeEventListener('keyup', handleKeyUp);
        }
        if(turn > 5){
          window.removeEventListener('keyup', handleKeyUp);
        }
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyUp, isCorrect, turn, showModal]);


  return (
    <div>
        <h2> Gesuchtes Wort: {word}</h2>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal word={word} isCorrect={isCorrect} turn={turn}/>}
    </div>
  )
}
