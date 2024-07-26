import React, { useState } from "react";
import generateNewNumbers from "../utils/generateNewNumbers";
import LotteryNumberList from "./LotteryNumberList";
import FixedNumberInput from "../utils/FixedNumberInput";

const NumberGenerator = () => {
  const [numberSets, setNumberSets] = useState([]);
  const [highlightIndexes, setHighlightIndexes] = useState([]);
  const [ultraHighlightIndex, setUltraHighlightIndex] = useState(null);
  const [fixedNumbers, setFixedNumbers] = useState([]);

  const handleGenerateNumbers = () => {
    const { allNumbers, highlightIndexes, ultraHighlightIndex } =
      generateNewNumbers(fixedNumbers);
    setNumberSets(allNumbers);
    setHighlightIndexes(highlightIndexes);
    setUltraHighlightIndex(ultraHighlightIndex);
  };

  return (
    <div className="container">
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
