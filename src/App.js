import React, { useState } from "react";
import "./App.css";

function generateNewNumbers() {
  let numbers = [];
  while (numbers.length < 6) {
    let randomNum = Math.ceil(Math.random() * 45);
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  numbers.sort((a, b) => a - b); // 오름차순 정렬
  return numbers;
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
  const [numbers, setNumbers] = useState([]);

  const handleGenerateNumbers = () => {
    const newNumbers = generateNewNumbers();
    setNumbers(newNumbers);
  };

  return (
    <div className="lottery-container">
      <div className="title">LOTTO77</div>
      <div className="subtitle">자신만의 로또 번호를 생성하세요</div>
      <p className="description">
        로또 번호 생성기 LOTTO77은 간편하게 로또 번호를 생성해주는 도구입니다.
        자신만의 행운 번호를 만들어보세요!
      </p>
      <button onClick={handleGenerateNumbers}>번호 생성</button>
      <div className="numberlist-container">
        <div className="numberlist">
          {numbers.map((number, index) => (
            <span
              key={index}
              className={`numberlist-item ${getClassname(number)}`}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
