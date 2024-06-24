import { WordObject } from "../../types/WordleTypes";
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

export default WordleGrid;
