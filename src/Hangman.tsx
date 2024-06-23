import { useState } from "react";
import "./App.css";
import getRandomWord from "./randomWordGenerator";

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

const HangmanWord: React.FC<{ wordArray: WordObject[] }> = ({ wordArray }) => {
  return (
    <div className="hangman-word">
      {wordArray.map(({ index, letter, guessed }) =>
        guessed ? (
          <h1 key={index} className="word-space">
            {letter}
          </h1>
        ) : (
          <h1 key={index} className="word-space">
            _
          </h1>
        )
      )}
    </div>
  );
};

const Keyboard: React.FC<{
  keyboardArray: KeyboardObject[];
  handleKeyClick: (index: number) => void;
}> = ({ keyboardArray, handleKeyClick }) => {
  return (
    <div className="keyboard">
      {keyboardArray.map(({ index, letter, guessed, inWord }) => (
        <button
          key={index}
          onClick={() => handleKeyClick(index)}
          className={`keyboard-button ${
            guessed && inWord ? "green" : guessed && !inWord ? "red" : ""
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

    const win = checkWin(wordArray)
    if (win) {
      setIsWin(true);
    }

    if (attemptsLeft === 1 && !win){
        setIsLost(true);
        setWordArray(wordArray.map(word => ({
            ...word,
            guessed: true
        })))
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
    <div>
      <h1>Guess the slang</h1>

      {isWin ? (
        <>
          <h3>Congratulations!</h3>
          <button onClick={() => handleReplayClick()}>Replay</button>
        </>
      ) : (
        <h3>Wrong guesses left: {attemptsLeft}</h3>
      )}

      {isLost && 
      <>
        <h3>GAME OVER</h3>
        <button onClick={() => handleReplayClick()}>Replay</button>
      </>
      }

      <HangmanWord wordArray={wordArray} />
      <Keyboard keyboardArray={keyboardArray} handleKeyClick={handleKeyClick} />
    </div>
  );
};

export default Hangman;
