import MemoryGame from "./games/memorygame/MemoryGame";
import Hangman from "./games/hangman/Hangman";
import Wordle from "./games/wordle/Wordle";
import RadioButtons from "./components/RadioButtons";
import MobileMenu from "./components/MobileMenu";

import { useState } from "react";

type GameComponents = {
  [key: string]: React.ComponentType;
};

const gameComponents: GameComponents = {
  MemoryGame,
  Wordle,
  Hangman
};

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("MemoryGame");
  const SelectedGameComponent = gameComponents[selectedGame];

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center select-none">
      <RadioButtons
        gameComponents={gameComponents}
        setSelectedGame={setSelectedGame}
      />
      <MobileMenu
        gameComponents={gameComponents}
        setSelectedGame={setSelectedGame}
        selectedGame = {selectedGame}
      />
      {SelectedGameComponent ? <SelectedGameComponent /> : null}
    </div>
  );
};

export default App;
