

type GameComponents = {
    [key: string]: React.ComponentType;
  }
  
const RadioButtons = ({ gameComponents, setSelectedGame }: { gameComponents: GameComponents, setSelectedGame: (game: string) => void }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedGame(event.target.value);
    };
  
    return (
<div className="hidden md:flex md:flex-col md:space-y-5 md:p-5 md:fixed md:left-2">
{Object.keys(gameComponents).map((gameName) => (
          <label key={gameName} className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="game-option"
              type="radio"
              value={gameName}
              onChange={handleChange}
            />
            <div
              className={`ml-6 md:ml-0 w-6 h-6 bg-transparent border-2 rounded-full peer-checked:bg-pink-400 peer-checked:border-pink-500 peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out`}
            ></div>
            <span className="ml-1 md:ml-2 text-white font-extrabold peer-checked:text-pink-400">{gameName}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default RadioButtons;