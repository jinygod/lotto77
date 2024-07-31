import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import NumberGenerator from "./components/NumberGenerator";
import LotteryImage from "./components/LotteryImage";
import Title from "./components/Title";
import Footer from "./components/Footer";
import StatisticsPage from "./components/StatisticsPage";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const titles = [
    "안녕하세요, LOTTO77입니다",
    "자신만의 특별한 로또 번호를 생성하세요",
    "히든번호가 숨어있어요!",
    "고정번호를 추가할 수 있어요!",
    "고정번호를 제외한 나머지 번호는 랜덤이에요",
    "TMI: 평균 1등 당첨금액은 2,034,590,933원이에요!",
    "TMI: 최고 1등 당첨금은 407억 2295만원이에요!",
    "TMI: 복권당첨자가 꾼 꿈 중 47%는 조상꿈이래요!",
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
    <div className="lottery-container-wrapper">
      <div className="lottery-container">
        <LotteryImage />
        <Title text={titles[currentIndex]} fade={fade} />
        <NumberGenerator />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/result" element={<Result />} /> */}
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
