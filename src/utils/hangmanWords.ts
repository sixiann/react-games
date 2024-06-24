import getRandom from "./getRandom";

const words: string[] = [
  "slay",
  "mother",
  "cuntology",
  "word",
  "brick",
  "ate",
  "skibidi",
  "rizz",
  "toilet",
  "ohio",
  "fanumtax",
  "serve",
  "cook",
  "gyatt",
  "ohio",
  "bet",
  "cap",
  "bop",
  "bussin",
  "clout",
  "cringe",
  "based",
  "delulu",
  "drip",
  "GOAT",
  "giving",
  "lowkey",
  "mid",
  "mood",
  "period",
  "sus",
  "tea"
];

// const getRandomWord = (): string => {
//   const randomIndex = Math.floor(Math.random() * words.length);
//   return words[randomIndex];
// };

// export default getRandomWord;


const getRandomWord = ():string => {
  return getRandom(words, 1)[0];
}

export default getRandomWord;
