import { useState, useEffect } from "react";

type GameComponents = {
    [key: string]: React.ComponentType;
  };
  
const MobileMenu = ({ gameComponents, setSelectedGame, selectedGame }: { gameComponents: GameComponents, setSelectedGame: (game: string) => void, selectedGame:string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        const firstGame = Object.keys(gameComponents)[0];
        const firstRadioButton = document.querySelector(`input[name="game-option"][value="${selectedGame}"]`);
        if (firstRadioButton) {
            (firstRadioButton as HTMLInputElement).checked = true;
        }
    }, [gameComponents]);

    
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
                {Object.keys(gameComponents).map((gameName, index) => (
                    <label key={index} className="cursor-pointer">
                        <input
                            type="radio"
                            className="sr-only peer"
                            name="game-option"
                            value={gameName}
                            onChange={() => setSelectedGame(gameName)}
                            />
                        <span className="py-1 px-2 peer-checked:text-pink-400">{gameName}</span>
                    </label>
                ))}
            </div>       

            <div className="bg-white fixed bottom-5 left-5 w-12 h-12 cursor-pointer flex flex-col items-center justify-center rounded-lg">
                <button
                    className=" md:hidden bg-white text-black text-3xl p-0 h-12"
                    onClick={toggleMenu}
                >
                    {isOpen ? '❌ ' : '☰'}
                </button>
            </div>
        </label>
    );
};



export default MobileMenu;
