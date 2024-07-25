import React, { useState, useEffect } from "react";
import generateNewNumbers from "../utils/generateNewNumbers";
import LotteryNumberList from "./LotteryNumberList";

const NumberGenerator = () => {
  const [numberSets, setNumberSets] = useState([]);
  const [highlightIndexes, setHighlightIndexes] = useState([]);
  const [ultraHighlightIndex, setUltraHighlightIndex] = useState(null);

  const handleGenerateNumbers = () => {
    const { allNumbers, highlightIndexes, ultraHighlightIndex } =
      generateNewNumbers();
    setNumberSets(allNumbers);
    setHighlightIndexes(highlightIndexes);
    setUltraHighlightIndex(ultraHighlightIndex);
  };

  useEffect(() => {
    if (ultraHighlightIndex !== null) {
      addConfetti();
      // 5초 후 confetti 요소 제거
      setTimeout(() => {
        const confettiElements = document.querySelectorAll(".confetti");
        confettiElements.forEach((element) => element.remove());
      }, 5000); // 5초 후
    }

    return () => {
      const confettiElements = document.querySelectorAll(".confetti");
      confettiElements.forEach((element) => element.remove());
    };
  }, [ultraHighlightIndex]);

  const addConfetti = () => {
    const container = document.querySelector(".lottery-container");
    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * (containerRect.width - 12)}px`; // confetti 폭을 제외하여 위치 조정
      confetti.style.top = `${Math.random() * (containerRect.height - 12)}px`; // confetti 높이를 제외하여 위치 조정
      confetti.style.backgroundColor = getRandomColor(); // 랜덤 색상 설정
      container.appendChild(confetti);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#ff6f61",
      "#6ec1e4",
      "#a2d9a4",
      "#f5b7b1",
      "#f7dc6f",
      "#e59866",
      "#9b59b6",
      "#48c9b0",
      "#f39c12",
      "#e74c3c",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <button onClick={handleGenerateNumbers}>번호 생성</button>
      <div className="numberlist-container">
        {numberSets.map((numbers, index) => (
          <LotteryNumberList
            key={index}
            numbers={numbers}
            isHighlight={highlightIndexes.includes(index)}
            isUltraHighlight={ultraHighlightIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberGenerator;
