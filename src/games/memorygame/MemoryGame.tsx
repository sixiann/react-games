import { useState } from "react";
import getRandomImages from "./memoryImages";
import ReplayButton from "../../components/ReplayButton";
import Title from "../../components/Title";
import Description from "../../components/Description";
import { ImageObject } from "../../types/MemoryGameTypes";
import lodash from "lodash";

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

  function handleReplayClick(): void {
    const images = createImageArray(getRandomImages());
    setImageArray(images);
    setPrevImage(null);
    setIsWin(false);
  }

  return (
    <>
      <Title text="Memory Game"/>
      <Description text="Test your memory by matching the cards"/>
      {isWin && (
        <div className="mt-4">
          <Description text="Congratulations!"/>
          <ReplayButton handleReplayClick={handleReplayClick} />
        </div>
      )}
      
      <div className="mt-6 mx-auto grid grid-cols-3 md:grid-cols-4 gap-4 w-5/6 sm:w-3/6 auto-cols-max">
        {imageArray.map(({ id, img, flipped }) =>
          flipped ? (
            <img
              key={id}
              src={img}
              className="object-cover aspect-square rounded-md"
            ></img>
          ) : (
            <button
              key={id}
              className=" bg-pink-300 hover:bg-pink-400 hover:border-0 aspect-square"
              onClick={() => handleButtonClick({ id, img, flipped })}
            ></button>
          )
        )}
      </div>
    </>
  );
};

export default MemoryGame;
