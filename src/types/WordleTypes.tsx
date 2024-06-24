export type WordObject = {
  index: number;
  letter: string;
  state: "notGuessed" | "guessedRightPosition" | "guessedWrongPosition";
  userGuess: string;
};

export type KeyboardObject = {
  index: number;
  letter: string;
  indexesInWord: number[];
};


export enum GameState {
    Neutral = "neutral",
    Win = "win",
    Lose = "lose",
}


