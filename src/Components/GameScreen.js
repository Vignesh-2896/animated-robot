import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { MemoryBox } from "./MemoryBox";
import { GameScore } from "./GameScore";
import { InfinitySpin } from "react-loader-spinner";

const GameScreen = () => {
  const [imageList, setImageList] = useState({}); // State to hold all the character names and images.
  const [isLoading, setIsLoading] = useState(true); // State to check if fetch is complete or not.

  const [pastItemClicked, setPastItemClicked] = useState([]); // State to keep track of images already clicked.
  const [currentScore, setCurrentScore] = useState(0); // State to keep track of current score.
  const [bestScore, setBestScore] = useState(0); // State to keep track of best score.

  let characterList = [
    "Denki_Kaminari",
    "Izuku_Midoriya",
    "Ochaco_Uraraka",
    "Eijiro_Kirishima",
    "Shoto_Todoroki",
    "Fumikage_Tokoyami",
    "Katsuki_Bakugo",
    "Toru_Hagakure",
    "Nejire_Hado",
    "Mina_Ashido",
    "Minoru_Mineta",
    "Tsuyu_Asui",
  ];

  useEffect(() => {
    (async () => {
      characterList.forEach(async function (item) {
        let response = await fetchData(item);
        let tmpVar = imageList;
        tmpVar[response.name] = response.images[1]; // Data is added to the imageList state as a key-value pair,
        setImageList(tmpVar); // with key being the character name, and value being the character iamge.
        if (Object.keys(imageList).length === 12) setIsLoading(false);
      });
    })();
  }, []);

  const fetchData = async (character_name) => {
    // Fetch data for every character.
    let response = await fetch(
      `https://myheroacademiaapi.com/api/character/${character_name}`
    );
    response = await response.json();
    return response;
  };

  const checkMemory = (itemClicked) => {
    // Function for handling the game.
    if (pastItemClicked.indexOf(itemClicked) === -1) {
      // If Image has not been clicked,
      let temp = pastItemClicked;
      temp.push(itemClicked);
      setPastItemClicked(temp); // We add image to list of past clicked images.
      setCurrentScore(currentScore + 1); // We increase current score.
      if (pastItemClicked.length === 12) pastItemClicked.splice(0, 1); // If 12 items have been clicked, the first clicked item is removed.
    } else {
      // If Image has already been clicked, game is over.
      alert(
        "Oops ! You clicked on an already clicked item. Final Score is " +
          currentScore +
          " :)"
      );
      if (currentScore > bestScore) setBestScore(currentScore); // Update Best Score.
      setPastItemClicked([]); // Clear the list of past items.
      setCurrentScore(0); // Reset current score as 0.
    }
    rearrangeImages(); // Rearrange images after every click.
  };

  const rearrangeImages = () => {
    // Function to rearrange images on the Game Screen.
    let tmpVar = {};
    let keyArray = fetchKeyArray(); // First we fetch the list of keys available.
    keyArray = shuffleArray(keyArray); // Second, we shuffle the list of keys.
    // Lastly, we fetch the values of all the keys from the imageList state and store it in a new object.
    for (const element of keyArray) tmpVar[element] = imageList[element];
    setImageList(tmpVar);
  };

  const fetchKeyArray = () => {
    // Function to fetch list of keys in object.
    let tmpArray = [];
    Object.keys(imageList).map((item) => tmpArray.push(item));
    return tmpArray;
  };

  const shuffleArray = (tmpArray) => {
    // Function to shuffle/randomize elements in the provided array.
    for (let i = 0; i < tmpArray.length; i++) {
      let randomVal = Math.floor(Math.random() * tmpArray.length);
      [tmpArray[i], tmpArray[randomVal]] = [tmpArray[randomVal], tmpArray[i]];
    }
    return tmpArray;
  };

  return (
    <div>
      {isLoading ? ( // If Fetch has not been complete, a Loading animation will be displayed.
        <div className="loaderDiv">
          <InfinitySpin color="#00BFFF" height={120} width={120} />
        </div>
      ) : (
        <div className="gamescreen">
          <h1 style={{ textAlign: "center" }}>
            My Hero Academia - Memory Game
          </h1>
          <h4 style={{ textAlign: "center" }}>
            Score points by clicking on a new image every click. If you click
            the same image, it's Game Over
          </h4>
          <GameScore curScore={currentScore} bstScore={bestScore} />
          {Object.keys(imageList).map(function (item) {
            return (
              <MemoryBox
                key={item}
                characterName={item}
                characterImage={imageList[item]}
                buttonAction={checkMemory}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { GameScreen };
