import React from "react";

const ColorChange = ({ color, flash, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`colorCard ${color} ${flash ? "flash" : ""}`}
    ></div>
  );
};

export default ColorChange;
