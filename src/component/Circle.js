import React, { useEffect, useState } from "react";
import ColorChange from "./ColorChange";
import timeout from "./Helper";
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
  const [flash, setFlash] = useState("");

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

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];

      const copyColor = [...play.colors];
      copyColor.push(newColor);
      setPlay({ ...play, colors: copyColor });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
		await timeout(1000)	
    for (let i = 0; i < play.colors.length; i++) {
      setFlash(play.colors[i]);
      await timeout(1000);
      setFlash("");
      await timeout(1000);

      if (i === play.colors.length - 1) {
        const copyColor = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          playUser: true,
          userColors: copyColor.reverse(),
        });
      }
    }
  }

  async function clickHandle(colors) {
    if (!play.isDisplay && play.playUser) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlash(colors);

      if (colors === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(500);
          setPlay({
            ...play,
            isDisplay: true,
            playUser: false,
            score: play.colors.length,
						userColors:[]
          });
        }
      } else {
        await timeout(1000);
        setPlay({ ...initialPlay, score: play.colors.length });
      }
      await timeout(1000);
      setFlash("");
    }
  }

  return (
    <div className="section">
      <div className="container">
        <div className="quarterCircle">
          {colorList&&colorList.map((color) => (
            <ColorChange
              onClick={(colors) => clickHandle(colors)}
              flash={flash === color}
              color={color}
            />
          ))}
        </div>
        {!isOn && !play.score && (
          <div className="btn">
            <button onClick={handleClick}>Start</button>
          </div>
        )}
        {isOn && (play.isDisplay || play.playUser) && (
          <div className="btn btn-score">
            <button>{play.score}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Circle;
