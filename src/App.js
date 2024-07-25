import React from "react";
import "./styles/App.css";
import NumberGenerator from "./components/NumberGenerator";

function App() {
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
      </p>
      <p className="mini-description">
        낮은 확률로 나오는 히든번호들을 찾아보세요!
      </p>
      <NumberGenerator />
    </div>
  );
}

export default App;
