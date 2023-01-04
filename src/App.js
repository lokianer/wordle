import  { words } from "./words.js"
import Wordle from "./components/wordle.js"

function App() {
  const the_word = words[Math.floor(Math.random() * words.length)];

  return (
    <>
      <h1>Wordle by Lokianer</h1>
      {the_word && <Wordle word={the_word.toLowerCase()} wordlist={words} />}
    </>
  );
}

export default App;
