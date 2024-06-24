
const words = [
  "drake", "adele", "elvis", "oprah",  
  "usher", "snoop", "swift", "bruno", 
  "banks", "keira", "rebel", "ringo",  
  "grace", "halle", "bjork", 
  "bowie", "ricky", "elton", "lenny", "miley", 
  "nelly", "madge", "randy", "sacha", 
  "jaden", "lorde", "brady", "busta", 
  "busta", "floyd", "magic", "kanye", "diddy", 
  "ozuna", "fetty",
];

const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export default getRandomWord;
