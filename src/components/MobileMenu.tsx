import { useState } from "react";

type GameComponents = {
  [key: string]: React.ComponentType;
};

const MobileMenu = ({
  gameComponents,
  setSelectedGame,
  selectedGame,
}: {
  gameComponents: GameComponents;
  setSelectedGame: (game: string) => void;
  selectedGame: string;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGame(event.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <label className="md:hidden">
      <input
        className="hidden peer"
        type="checkbox"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <div className="fixed bottom-6 left-16 font-extrabold text-white p-2 rounded shadow-lg transition-all duration-300 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto flex flex-row">
        {Object.keys(gameComponents).map((gameName) => (
          <label key={gameName} className="cursor-pointer">
            <input
              type="radio"
              className="sr-only peer"
              name="game-option"
              value={gameName}
              onChange={handleChange}
            />
            <span
              className={`py-1 px-2 ${
                gameName === selectedGame ? "text-pink-400" : ""
              }`}
            >
              {gameName}
            </span>
          </label>
        ))}
      </div>

      <div className="bg-white fixed bottom-5 left-5 w-12 h-12 cursor-pointer flex flex-col items-center justify-center rounded-lg">
        <button
          className=" md:hidden bg-white text-black text-3xl p-0 h-12"
          onClick={toggleMenu}
        >
          {isOpen ? "❌ " : "☰"}
        </button>
      </div>
    </label>
  );
};

export default MobileMenu;
