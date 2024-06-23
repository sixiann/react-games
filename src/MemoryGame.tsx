import { useState } from "react";
import "./App.css";
import getRandomImages from "./imageArrayGenerator";

import lodash from "lodash";

type ImageObject = {
  id: number;
  img: string;
  flipped: boolean;
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

function checkWin(imageArray: ImageObject[]): boolean {
  const isWin = imageArray.every((image) => image.flipped);
  return isWin;
}

const MemoryGame = () => {
  const images = createImageArray(getRandomImages());
  const [imageArray, setImageArray] = useState<ImageObject[]>(images);
  const [prevImage, setPrevImage] = useState<ImageObject | null>();
  const [isWin, setIsWin] = useState<boolean>(false);

  function handleButtonClick(image: ImageObject): void {
    const newImageArray = imageArray.slice();

    //flip this image
    newImageArray[image.id].flipped = true;

    //check whether this image matches the previous image if there is a previous
    if (prevImage) {
      if (image.img === prevImage.img) {
        newImageArray[prevImage.id].flipped = true;
        setPrevImage(null);
      } else {
        newImageArray[prevImage.id].flipped = false;
        setPrevImage(image);
      }
    } else {
      setPrevImage(image);
    }

    //re-render the whole image grid
    setImageArray(newImageArray);

    if (checkWin(newImageArray)) {
      setIsWin(true);
    }
  }

  function handleReplayClick():void{
    const images = createImageArray(getRandomImages());
    setImageArray(images);
    setPrevImage(null);
    setIsWin(false);
  }

  return (
    <>
      <h1>Memory Game</h1>
      {isWin && 
      (<>
      <h2> Congratulations!</h2>
      <button 
      className="replay"
      onClick = {() => handleReplayClick()}>Replay</button>
      </>
      )
      }
      <div className="grid-container">
        {imageArray.map(({ id, img, flipped }) =>
          flipped ? (
            <img src={img} className="square image"></img>
          ) : (
            <button
              className="square button"
              onClick={() => handleButtonClick({ id, img, flipped })}
            ></button>
          )
        )}
      </div>
    </>
  );
};

export default MemoryGame;
