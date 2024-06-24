
import { KeyboardObject } from "../../types/HangmanTypes";


const Keyboard: React.FC<{
    className: string;
    keyboardArray: KeyboardObject[];
    handleKeyClick: (index: number) => void;
  }> = ({ className, keyboardArray, handleKeyClick }) => {
    return (
      <div className={className}>
        {keyboardArray.map(({ index, letter, guessed, inWord }) => (
          <button
            key={index}
            onClick={() => handleKeyClick(index)}
            className={`text-black mr-2 mb-2 hover:bg-blue-200 aspect-square w-12 md:w-16 rounded-2xl ${
              guessed && inWord
                ? " bg-emerald-400 pointer-events-none	"
                : guessed && !inWord
                ? " bg-rose-400 pointer-events-none	"
                : !guessed
                ? "bg-white"
                : ""
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  export default Keyboard;