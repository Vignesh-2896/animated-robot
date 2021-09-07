import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { MemoryBox } from './MemoryBox';

const GameScreen = () => {


    const [imageList, setImageList] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
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
      "Tsuyu_Asui"
    ]
  
    useEffect(() => {
  
      (async () => {
  
        await characterList.forEach(async function(item){
          let response =  await fetchData(item);
          let tmpVar = imageList;
          tmpVar[response.name] = response.images[1];
          setImageList(tmpVar);
          if(Object.keys(imageList).length ===  12) setIsLoading(false)
        });
  
      })()

    },[])
  
    const fetchData = async(character_name) => {
      let response = await fetch(`https://myheroacademiaapi.com/api/character/${character_name}`);
      response = await response.json();
      return response;
    }

    return (
        <div>
            {isLoading // If Fetch has not been complete, a Loading animation will be displayed.
                ? (<div className = "loaderDiv"><Loader type="TailSpin" color="#00BFFF" height={120} width={120}/></div>)
                : ( 
                    <div className = "gamescreen">
                        <h3>GameScreen</h3>
                        {Object.keys(imageList).map(function(item){
                            return <MemoryBox key = {item} characterName = {item} characterImage = {imageList[item]} />
                        })}
                    </div>
            )}
        </div>
    )
}

export {GameScreen}