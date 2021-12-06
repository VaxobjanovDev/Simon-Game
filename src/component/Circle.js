import React, { useEffect, useState } from "react";
import ColorChange from "./ColorChange";
import "./Main.css";

const Circle = () => {
  const [isOn, setIsOn] = useState(false);
  const initialPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    playUser: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initialPlay);

  const colorList = ["green", "red", "blue", "yellow"];

  function handleClick() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initialPlay, isDisplay: true });
    } else {
      setPlay(initialPlay);
    }
  }, [isOn]);

	useEffect(()=>{

		if(isOn&&play.isDisplay){
			let newColor = colorList[Math.floor(Math.random()*4)]

			const copyColor = [...play.colors]
			copyColor.push(newColor)
			setPlay({...play, colors:copyColor})
		}

	},[isOn,play.isDisplay])

	useEffect(()=>{
		if(isOn&&play.isDisplay&&play.colors.length){
			displayColors()
		}
	},[isOn, play.isDisplay, play.colors.length])



  return (
    <div className="section">
      <div className="container">
        <div className="quarterCircle">
          {colorList.map((color) => (
            <ColorChange color={color} />
          ))}
        </div>
        {!isOn && !play.score && (
          <div className="btn">
            <button onClick={handleClick}>Start</button>
          </div>
        )}
				 {isOn && (play.isDisplay||play.playUser) && (
          <div className="btn btn-score">
            <button onClick={handleClick}>{play.score}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Circle;
