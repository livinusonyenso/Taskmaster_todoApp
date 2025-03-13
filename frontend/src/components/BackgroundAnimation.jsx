import React, { useState, useEffect } from "react";
import "../BackgroundAnimation.css"; // ✅ Import the updated CSS file

const textArray = ["Isong Techie ", "Team Todoapp", "Elijah Muze", "Livinus Ekene", "Freedom Urom", "Uwem Essien"];

const BackgroundAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-container">
      <div className={`animated-text text-${index % 4}`} key={textArray[index]}>
        {textArray[index]}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
