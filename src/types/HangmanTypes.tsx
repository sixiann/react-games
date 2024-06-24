export type WordObject = {
  index: number;
  letter: string;
  guessed: boolean;
};

export type KeyboardObject = {
  index: number;
  letter: string;
  guessed: boolean;
  inWord: boolean;
  indexesInWord: number[];
};
