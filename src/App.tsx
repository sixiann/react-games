import MemoryGame from "./games/memorygame/MemoryGame";
import Hangman from "./games/hangman/Hangman";
import Wordle from "./games/wordle/Wordle";
import RadioButtons from "./components/RadioButtons";

import { useState } from "react";

type GameComponents = {
  [key: string]: React.ComponentType;
};

const gameComponents: GameComponents = {
  Hangman,
  MemoryGame,
  Wordle,
};

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("Wordle");
  const SelectedGameComponent = gameComponents[selectedGame];

  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center text-center select-none">
      <RadioButtons
        gameComponents={gameComponents}
        setSelectedGame={setSelectedGame}
      />
      {SelectedGameComponent ? <SelectedGameComponent /> : null}
    </div>
  );
};

export default App;
