import { useState } from "react";
import Title from "./components/Title";
import Description from "./components/Description";
import ReplayButton from "./components/ReplayButton";

type WordObject = {
  index: number;
  letter: string;
  state: "notGuessed" | "guessedRightPosition" | "guessedWrongPosition";
  userGuess: string;
};

type KeyboardObject = {
  index: number;
  letter: string;
  indexesInWord: number[];
};

enum GameState {
  Neutral = "neutral",
  Win = "win",
  Lose = "lose"
}

const createWordArray = (word: string): WordObject[][] => {
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

const createKeyboardArray = (word: string): KeyboardObject[] => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArray = alphabet.split("");

  const getIndexes = (word: string, letter: string): number[] => {
    const indexes: number[] = [];
    let idx = word.indexOf(letter);
    while (idx !== -1) {
      indexes.push(idx);
      idx = word.indexOf(letter, idx + 1);
    }
    return indexes;
  };

  const keyboardArray = alphabetArray.map((letter: string, index: number) => {
    const indexesInWord = getIndexes(word, letter);
    return {
      index: index,
      letter: letter,
      indexesInWord: indexesInWord,
    };
  });

  return keyboardArray;
};

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

const WordleGrid: React.FC<{
  className: string;
  wordArray: WordObject[][];
}> = ({ className, wordArray }) => {
  const getColor = (word: WordObject) => {
    if (word.state === "guessedRightPosition") {
      return "bg-emerald-400";
    } else if (word.state === "guessedWrongPosition") {
      return "bg-yellow-400";
    } else {
      return "bg-gray-400";
    }
  };

  return (
    <div
      className={`mx-auto grid grid-cols-5 gap-2 w-5/6 sm:w-3/6 auto-cols-max ${className}`}
    >
      {wordArray.map((row, rowIndex) =>
        row.map((word, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`aspect-square ${getColor(
              word
            )} flex items-center justify-center`}
          >
            <h1 className="p-0 font-extrabold">{word.userGuess}</h1>
          </div>
        ))
      )}
    </div>
  );
};

const Keyboard: React.FC<{
  className: string;
  handleKeyClick: (key: KeyboardObject) => void;
  word: string;
}> = ({ className, handleKeyClick, word }) => {
  const keyboardArray = createKeyboardArray(word);

  return (
    <div className={className}>
      {keyboardArray.map((key: KeyboardObject) => (
        <button
          key={key.index}
          onClick={() => handleKeyClick(key)}
          className="bg-white text-black mr-1 mb-1 hover:bg-blue-200 aspect-square w-12 rounded-2xl"
        >
          {key.letter}
        </button>
      ))}
    </div>
  );
};

const Wordle: React.FC = () => {
  const word = "hello";
  const newWordArray = createWordArray(word);

  const [wordArray, setWordArray] = useState<WordObject[][]>(newWordArray);
  const [gameState, setGameState] = useState<GameState>(GameState.Neutral);

  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const handleKeyClick = (key: KeyboardObject): void => {
    console.log(row, col);
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

    setIndex(index+1);

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
    const newWord = "abcde";
    setWordArray(createWordArray(newWord));
    setGameState(GameState.Neutral);
    setRow(0);
    setCol(0);
  };

  return (
    <div className="md:px-28 xl:px-60 px-3">
      <Title text="Wordle" />
      <Description text="Guess the 5 letter word" />
      {gameState === "win" && (
        <>
          <Description text="Congratulations!" />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      )}

      {gameState === "lose" && (
        <>
          <Description text={`The word was "${word}". Better luck next time!`} />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      )} 

      <WordleGrid className="mt-2" wordArray={wordArray} />
      <Keyboard
        className="mt-5 sm:w-5/6 lg:w-5/6 mx-auto"
        handleKeyClick={handleKeyClick}
        word={word}
      />
    </div>
  );
};

export default Wordle;
