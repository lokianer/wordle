import { useState } from 'react';

const useWordle = (word, wordlist) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [showModal, setShowModal] = useState(false);




    const formatGuess = () => { 
        let wordArray = [...word];
        let formattedGuess = [...currentGuess].map((letter)=>{
            return {
                key: letter,
                color: 'grey',
            }
        })

        //find correct letters
        formattedGuess.forEach((letter, index) => {
            if(wordArray[index] === letter.key) {
                formattedGuess[index].color = 'green';
                wordArray[index] = null;
            }    
        });

        formattedGuess.forEach((letter, index) => {
            if(wordArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                wordArray[wordArray.indexOf(letter.key)] = null;
            }
        });

        return formattedGuess;
    };
    const addNewGuess = (formattedGuess) => { 
        if(currentGuess === word) {
            setIsCorrect(true);
            setShowModal(true);
        }
        setGuesses((prev) => {
            let newGuesses = [...prev];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory((prev) => {
            return [...prev, currentGuess];
        });

        setTurn((prev) => {
            return prev + 1;
        });

        setUsedKeys((prev) => {
            let newKeys = {...prev};
            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key];
                if(letter.color === 'green') {
                    newKeys[letter.key] = 'green';
                    return
                }
                if(letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow';
                    return
                }
                if(letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey';
                    return
                }

            });
            return newKeys;
        });

        setCurrentGuess('');


    };

    const handleKeyUp = ({ key }) => {
        if(key === 'Enter') {
            //only add guess if turn is less than 5
            if (turn > 5) {
                setShowModal(true);
                return;
            }
            // do not add duplicate words
            if(history.includes(currentGuess)) {
                return;
            }

            if(!wordlist.includes(currentGuess.toUpperCase())) {
                return;

            }


            if(currentGuess.length !== 5) {
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
            return;
        }

        if (key.match(/^[a-zA-Z]$/i)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) =>  prev + key);
            }
        }
    };

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        showModal,
        handleKeyUp,
    }

}
export default useWordle;