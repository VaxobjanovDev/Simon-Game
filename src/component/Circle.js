import React, { useEffect, useState } from "react";
import timeout from "./Helper";
import ColorCard from "./ColorChange";
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
    await timeout(1000);
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

  async function clickHandle(color) {
    if (!play.isDisplay && play.playUser) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlash(color);
      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(1000);
          setPlay({
            ...play,
            isDisplay: true,
            playUser: false,
            score: play.colors.length,
            userColors: [],
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

  function closeHandle() {
    setIsOn(false);
  }

  return (
    <div className="section">
	
      <div className="container">		<div className='text-header'>
				<h2>Simon Game</h2>
			</div>
        <div className="quarterCircle">
          {colorList &&
            colorList.map((v, i) => (
              <ColorCard
                onClick={() => {
                  clickHandle(v);
                }}
                flash={flash === v}
                color={v}
              ></ColorCard>
            ))}
        </div>
        {isOn && !play.isDisplay && !play.playUser && play.score && (
          <div className="lost">
            <h3>FinalScore: {play.score}</h3>
            <button onClick={closeHandle}>Close</button>
          </div>
        )}
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
