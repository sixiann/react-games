import { KeyboardObject } from "../../types/WordleTypes";

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
        indexesInWord: indexesInWord,
      };
    });
  
    return keyboardArray;
  };


const Keyboard: React.FC<{
    className: string;
    handleKeyClick: (key: KeyboardObject) => void;
    word: string;
  }> = ({ className, handleKeyClick, word }) => {
    const keyboardArray = createKeyboardArray(word);
  
    return (
      <div className={className}>
        {keyboardArray.map((key: KeyboardObject) => (
          <button
            key={key.index}
            onClick={() => handleKeyClick(key)}
            className="bg-white text-black mr-1 mb-1 hover:bg-blue-200 aspect-square w-10 lg:w-12 rounded-2xl"
          >
            {key.letter}
          </button>
        ))}
      </div>
    );
  };

  export default Keyboard;