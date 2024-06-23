import MemoryGame from "./MemoryGame";
import Hangman from "./Hangman";
import { useState } from "react";
import "./App.css";

function App() {
  const [selectedGame, setSelectedGame] = useState<string>("MemoryGame");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  return (
    <div>
      <select value={selectedGame} onChange={handleChange}>
        <option value="MemoryGame">Memory Game</option>
        <option value="Hangman">Hangman</option>
      </select>
      {selectedGame === "MemoryGame" ? <MemoryGame /> : <Hangman />}
    </div>
  );
}

export default App;
