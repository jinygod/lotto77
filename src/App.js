import React, { useState, useEffect } from "react";
import "./styles/App.css";
import NumberGenerator from "./components/NumberGenerator";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const titles = [
    "LOTTO77",
    "자신만의 특별한 로또 번호를 생성하세요",
    "히든번호가 숨어있어요!",
    "고정번호를 추가할 수 있어요!",
    "고정번호를 제외한 나머지 번호는 랜덤이에요",
    "TMI: 평균 1등 당첨금액은	2,034,590,933원이에요!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setFade(true);
      }, 500); // 페이드 아웃 시간
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [titles.length]);

  return (
    <div className="lottery-container">
      <img
        src={`${process.env.PUBLIC_URL}/main.png`}
        alt="Lotto"
        className="lotto-image"
      />
      <div className={`title ${fade ? "fade-in" : "fade-out"}`}>
        {titles[currentIndex]}
      </div>
      <NumberGenerator />
    </div>
  );
}

export default App;
