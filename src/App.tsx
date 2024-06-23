import MemoryGame from "./MemoryGame";
import Hangman from "./Hangman";
import { useState } from "react";
import "./App.css";

function App() {
  const [selectedGame, setSelectedGame] = useState<string>("Hangman");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  return (
    <div>
      <select value={selectedGame} onChange={handleChange}>
        <option value="Hangman">Hangman</option>
        <option value="MemoryGame">Memory Game</option>
      </select>
      {selectedGame === "Hangman" ? <Hangman /> : <MemoryGame />}
    </div>
  );
}

export default App;
