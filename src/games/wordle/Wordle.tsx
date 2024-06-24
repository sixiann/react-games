import { useState } from "react";
import Title from "../../components/Title";
import Description from "../../components/Description";
import ReplayButton from "../../components/ReplayButton";
import Keyboard from "./Keyboard";
import WordleGrid from "./WordleGrid";
import { WordObject, KeyboardObject, GameState } from "../../types/WordleTypes";
import getRandomWord from "./wordleWords";

const checkWin = (wordArray: WordObject[][]): boolean => {
  for (const row of wordArray) {
    const allGuessedRight = row.every(
      (cell) => cell.state === "guessedRightPosition"
    );
    if (allGuessedRight) {
      return true;
    }
  }
  return false;
};

const createWordArray = (): WordObject[][] => {
  const word = getRandomWord();
  const wordArray: string[] = word.split("");
  const newWordArray: WordObject[][] = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, (_, index) => ({
      index,
      letter: wordArray[index],
      state: "notGuessed" as const,
      userGuess: "",
    }))
  );
  return newWordArray;
};



const Wordle: React.FC = () => {
  const [wordArray, setWordArray] = useState<WordObject[][]>(createWordArray());
  const [gameState, setGameState] = useState<GameState>(GameState.Neutral);
  const word = wordArray[0].map((cell) => cell.letter).join("");
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const handleKeyClick = (key: KeyboardObject): void => {
    const newWordArray = wordArray.slice();
    if (key.indexesInWord.includes(col)) {
      newWordArray[row][col].state = "guessedRightPosition";
    } else if (key.indexesInWord.length > 0) {
      newWordArray[row][col].state = "guessedWrongPosition";
    }

    newWordArray[row][col].userGuess = key.letter;
    setWordArray(newWordArray);
    if (checkWin(newWordArray)) {
      setGameState(GameState.Win);
      return;
    }

    setIndex(index + 1);

    if (col < 4) {
      setCol(col + 1);
    } else {
      // If it's the last column, reset column to 0 and increment row index
      if (row < 4) {
        setRow(row + 1);
        setCol(0);
      } else {
        // If it's the last cell in the grid and no win, set to lose
        setGameState(GameState.Lose);
      }
    }
  };

  const handleReplayClick = (): void => {
    setWordArray(createWordArray());
    setGameState(GameState.Neutral);
    setRow(0);
    setCol(0);
  };

  return (
    <div className="md:px-28 xl:px-60 px-3">
      <Title text="Wordle" />
      {gameState === "win" && (
        <>
          <Description text="Congratulations!" />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      )}

      {gameState === "lose" && (
        <>
          <Description
            text={`The word was "${word}". Better luck next time!`}
          />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      )}

      {gameState === "neutral" && (
        <Description text="Guess the 5 letter celebrity name" />
      )}
      <WordleGrid className="mt-2" wordArray={wordArray} />
      <Keyboard
        className="mt-5 sm:w-5/6 mx-auto"
        handleKeyClick={handleKeyClick}
        word={word}
      />
    </div>
  );
};

export default Wordle;
