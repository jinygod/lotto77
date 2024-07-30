import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import generateNewNumbers from "../utils/generateNewNumbers";
import LotteryNumberList from "./LotteryNumberList";
import FixedNumberInput from "../utils/FixedNumberInput";
import { v4 as uuidv4 } from "uuid"; // UUID 라이브러리
import { collection, addDoc, Timestamp } from "firebase/firestore"; // 필요한 모듈 가져오기

const NumberGenerator = () => {
  const [numberSets, setNumberSets] = useState([]);
  const [highlightIndexes, setHighlightIndexes] = useState([]);
  const [ultraHighlightIndex, setUltraHighlightIndex] = useState(null);
  const [fixedNumbers, setFixedNumbers] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [userId, setUserId] = useState("guest"); // 기본값은 'guest'

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 세션 ID 생성
    if (userId === "guest") {
      const newSessionId = `guest-${uuidv4().substring(0, 8)}`;
      setSessionId(newSessionId);
    }
  }, [userId]);

  const handleGenerateNumbers = async () => {
    const { allNumbers, highlightIndexes, ultraHighlightIndex } =
      generateNewNumbers(fixedNumbers);
    setNumberSets(allNumbers);
    setHighlightIndexes(highlightIndexes);
    setUltraHighlightIndex(ultraHighlightIndex);

    // Firestore에 저장할 데이터 형식 준비
    const numberSetsString = JSON.stringify(allNumbers);

    // Firebase에 번호 저장
    try {
      await addDoc(collection(db, "generatedNumbers"), {
        numbers: numberSetsString,
        userId: userId,
        sessionId: userId === "guest" ? sessionId : null,
        createdAt: Timestamp.now(),
      });
      console.log("Numbers saved to Firebase with session ID:", sessionId);
    } catch (error) {
      console.error("Error saving numbers to Firebase:", error);
    }
  };

  return (
    <div className="generator-container">
      <FixedNumberInput
        onFixedNumbersChange={setFixedNumbers}
        fixedNumbers={fixedNumbers}
      />
      <button onClick={handleGenerateNumbers} className="animated-button">
        번호 생성
      </button>
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
