import MemoryGame from "./games/memorygame/MemoryGame";
import Hangman from "./games/hangman/Hangman";
import Wordle from "./games/wordle/Wordle";
import { useState } from "react";


type GameComponents = {
  [key: string]: React.ComponentType;
}

const gameComponents: GameComponents = {
  Hangman,
  MemoryGame,
  Wordle
}
const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("Wordle");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  const SelectedGameComponent = gameComponents[selectedGame];

  return (
    <div className= "max-h-screen h-screen flex flex-col items-center justify-center text-center">
      <select
        value={selectedGame} 
        onChange={handleChange}>
        {Object.keys(gameComponents).map((game)=>(
          <option key={game} value={game}>{game}</option>
        ))}
      </select>
      {SelectedGameComponent ? <SelectedGameComponent /> : null}
    </div>
  );
}

export default App;
