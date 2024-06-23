const words: string[] = [
  "slay",
  "mother",
  "cuntology",
  "ate",
  "skibidi",
  "rizz",
  "toilet",
  "ohio",
  "fanum tax",
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

const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export default getRandomWord;
