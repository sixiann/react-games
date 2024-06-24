import { useState } from "react";
import getRandomWord from "./randomWordGenerator";
import Title from "./components/Title";
import Description from "./components/Description";
import ReplayButton from "./components/ReplayButton";

type WordObject = {
  index: number;
  letter: string;
  guessed: boolean;
};

type KeyboardObject = {
  index: number;
  letter: string;
  guessed: boolean;
  inWord: boolean;
  indexesInWord: number[];
};

const createWordArray = (word: string): WordObject[] => {
  const wordArray = word.split("");
  const newWordArray = wordArray.map((letter: string, index: number) => ({
    index: index,
    letter: letter,
    guessed: false,
  }));
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
      guessed: false,
      inWord: indexesInWord.length > 0,
      indexesInWord: indexesInWord,
    };
  });

  return keyboardArray;
};

const checkWin = (wordArray: WordObject[]): boolean => {
  const isWin = wordArray.every((letter) => letter.guessed);
  return isWin;
};

const HangmanWord: React.FC<{ className: string; wordArray: WordObject[] }> = ({
  className,
  wordArray,
}) => {
  return (
    <div className={`flex flex-row justify-center ${className}`}>
      {wordArray.map(({ index, letter, guessed }) =>
        guessed ? (
          <h1 key={index} className="mr-5 font-extrabold">
            {letter}
          </h1>
        ) : (
          <h1 key={index} className="mr-5 font-extrabold">
            _
          </h1>
        )
      )}
    </div>
  );
};

const Keyboard: React.FC<{
  className: string;
  keyboardArray: KeyboardObject[];
  handleKeyClick: (index: number) => void;
}> = ({ className, keyboardArray, handleKeyClick }) => {
  return (
    <div className={className}>
      {keyboardArray.map(({ index, letter, guessed, inWord }) => (
        <button
          key={index}
          onClick={() => handleKeyClick(index)}
          className={`text-black mr-2 mb-2 hover:bg-blue-200 aspect-square w-12 md:w-16 rounded-2xl ${
            guessed && inWord
              ? " bg-emerald-400 pointer-events-none	"
              : guessed && !inWord
              ? " bg-rose-400 pointer-events-none	"
              : !guessed
              ? "bg-white"
              : ""
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

const Hangman: React.FC = () => {
  const word = getRandomWord();
  const [wordArray, setWordArray] = useState<WordObject[]>(
    createWordArray(word)
  );

  const [keyboardArray, setKeyboardArray] = useState<KeyboardObject[]>(
    createKeyboardArray(word)
  );

  const [attemptsLeft, setAttemptsLeft] = useState<number>(11);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isLost, setIsLost] = useState<boolean>(false);

  const handleKeyClick = (index: number): void => {
    const key = keyboardArray[index];
    if (key.inWord) {
      const newWordArray = wordArray.slice();
      key.indexesInWord.forEach((index) => {
        newWordArray[index].guessed = true;
      });
      setWordArray(newWordArray);
    } else {
      setAttemptsLeft(attemptsLeft - 1);
    }
    const newKeyboardArray = keyboardArray.slice();
    newKeyboardArray[key.index].guessed = true;
    setKeyboardArray(newKeyboardArray);

    const win = checkWin(wordArray);
    if (win) {
      setIsWin(true);
    }

    if (attemptsLeft === 1 && !win && !key.inWord) {
      setIsLost(true);
      setWordArray(
        wordArray.map((word) => ({
          ...word,
          guessed: true,
        }))
      );
    }
  };

  const handleReplayClick = (): void => {
    setIsWin(false);
    setIsLost(false);
    const word = getRandomWord();
    setWordArray(createWordArray(word));
    setKeyboardArray(createKeyboardArray(word));
    setAttemptsLeft(11);
  };

  return (
    <div className="md:px-28 xl:px-60 px-3">
      <Title text="Guess the slang" />

      {isWin ? (
        <>
          <Description text="Congratulations!" />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      ) : (
        <Description text={`Wrong guesses left: ${attemptsLeft}`} />
      )}

      {isLost && (
        <>
          <Description text="GAME OVER" />
          <ReplayButton handleReplayClick={handleReplayClick} />
        </>
      )}
      <HangmanWord className=" mt-24" wordArray={wordArray} />
      <Keyboard
        className="mt-10"
        keyboardArray={keyboardArray}
        handleKeyClick={handleKeyClick}
      />
    </div>
  );
};

export default Hangman;
