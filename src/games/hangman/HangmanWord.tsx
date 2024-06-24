import { WordObject } from "../../types/HangmanTypes";

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

export default HangmanWord;
