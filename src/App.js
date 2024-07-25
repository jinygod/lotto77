import React, { useState } from "react";
import "./App.css";

function generateNewNumbers() {
  let allNumbers = [];
  let highlightIndexes = [];
  let ultraHighlightIndex = null;

  for (let i = 0; i < 5; i++) {
    let numbers = [];
    while (numbers.length < 6) {
      let randomNum = Math.ceil(Math.random() * 45);
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b); // 오름차순 정렬
    allNumbers.push(numbers);

    // 1% 확률로 highlightIndex 추가
    if (Math.random() < 0.08) {
      highlightIndexes.push(i);
    }

    // 0.01% 확률로 ultraHighlightIndex 설정
    if (Math.random() < 0.0019) {
      ultraHighlightIndex = i;
    }
  }

  return { allNumbers, highlightIndexes, ultraHighlightIndex };
}

function getClassname(number) {
  if (number >= 1 && number <= 10) {
    return "yellow";
  } else if (number >= 11 && number <= 20) {
    return "skyblue";
  } else if (number >= 21 && number <= 30) {
    return "lightpink";
  } else if (number >= 31 && number <= 40) {
    return "gray";
  } else if (number >= 41 && number <= 45) {
    return "green";
  }
}

function App() {
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

  return (
    <div className="lottery-container">
      <img
        src={`${process.env.PUBLIC_URL}/main.png`}
        alt="Lotto"
        className="lotto-image"
      />
      <div className="title">LOTTO77</div>
      <div className="subtitle">자신만의 로또 번호를 생성하세요</div>
      <p className="description">
        로또 번호 생성기 LOTTO77은 간편하게 로또 번호를 생성해주는 도구입니다.
        자신만의 행운 번호를 만들어보세요!
      </p>
      <p className="mini-description">
        낮은 확률로 나오는 히든번호들을 찾아보세요!
      </p>
      <button onClick={handleGenerateNumbers}>번호 생성</button>
      <div className="numberlist-container">
        {numberSets.map((numbers, index) => (
          <div
            key={index}
            className={`numberlist ${
              ultraHighlightIndex === index
                ? "ultra-highlight"
                : highlightIndexes.includes(index)
                ? "highlight"
                : ""
            }`}
          >
            {ultraHighlightIndex === index && (
              <div className="highlight-message">초 히든번호!!!!!!</div>
            )}
            {highlightIndexes.includes(index) && (
              <div className="highlight-message">히든번호!</div>
            )}
            {numbers.map((number, numIndex) => (
              <span
                key={numIndex}
                className={`numberlist-item ${getClassname(number)}`}
              >
                {number}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
