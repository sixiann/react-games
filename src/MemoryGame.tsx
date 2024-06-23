import { useState } from "react";
import "./App.css";

import lodash from "lodash";

type ImageObject = {
  id: number;
  img: string;
  flipped: boolean;
};

type MemoryGameProps = {
    testImages: string[];
};

function createImageArray(images: string[]): ImageObject[] {
  const newImageArray = lodash.shuffle([...images, ...images]);
  const imageArray = newImageArray.map((img, id) => ({
    id: id,
    img: img,
    flipped: false,
  }));
  return imageArray;
}

function checkWin(imageArray: ImageObject[]): boolean{
    const isWin = imageArray.every(image => image.flipped);
    return isWin;
}

const MemoryGame = ({ testImages }: MemoryGameProps) => {
  const images = createImageArray(testImages);
  const [imageArray, setImageArray] = useState<ImageObject[]>(images);
  const [prevImage, setPrevImage] = useState<ImageObject | null>();
  const [isWin, setIsWin] = useState<boolean>(false);

  function handleImageClick( image: ImageObject ): void {
    const newImageArray = imageArray.slice();

    //flip this image
    newImageArray[image.id].flipped = true;

    //check whether this image matches the previous image if there is a previous
    if (prevImage){
        if (image.img === prevImage.img){
            newImageArray[prevImage.id].flipped = true;
            setPrevImage(null);
        } else {
            newImageArray[prevImage.id].flipped = false;
            setPrevImage(image)
        }
    } else {
        setPrevImage(image)
    }

    //re-render the whole image grid
    setImageArray(newImageArray);

    if (checkWin(newImageArray)){
        setIsWin(true);
    }
  }

  return (
    <>
    <h1>Memory Game</h1>
    <div className="grid-container">
      {imageArray.map(({ id, img, flipped }) =>
        flipped ? (
          <img src={img} className="square image"></img>
        ) : (
          <button 
                  className="square button" 
                  onClick={() => handleImageClick({ id, img, flipped })}>
          </button>
        )
      )}
    </div>
    {isWin && (
        <h2> Congratulations!</h2>
    )}
    </>
  );
};

export default MemoryGame;
