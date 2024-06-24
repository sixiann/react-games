import { WordObject, KeyboardObject } from "../../types/HangmanTypes";
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

export { createKeyboardArray, createWordArray, checkWin };
