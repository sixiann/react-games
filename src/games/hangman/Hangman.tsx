import { useState } from "react";
import getRandomWord from "./hangmanWords";
import Title from "../../components/Title";
import Description from "../../components/Description";
import ReplayButton from "../../components/ReplayButton";
import Keyboard from "./Keyboard";
import HangmanWord from "./HangmanWord";
import { WordObject, KeyboardObject } from "../../types/HangmanTypes";
import { createWordArray, createKeyboardArray, checkWin } from "./utils";

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

    //setIsWin(checkWin(wordArray))

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

      {/* if attemptsLeft === 0 && !isWin {} */}
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
