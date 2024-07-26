import React from "react";
import getClassname from "../utils/getClassname";
import { useEffect } from "react";
import { firework } from "../utils/firework";

const LotteryNumberList = ({ numbers, isHighlight, isUltraHighlight }) => {

  useEffect(() => {
    if (isUltraHighlight) {
      firework(); // isUltraHighlight가 true일 때 firework() 호출
    }
  }, [isUltraHighlight]); // isUltraHighlight가 변경될 때마다 호출

  return (
    <div
      className={`numberlist ${
        isUltraHighlight ? "ultra-highlight" : isHighlight ? "highlight" : ""
      }`}
    >
      {isUltraHighlight && (
        <div className="highlight-message">초히든번호!!!!!!</div>
      )}
      {isHighlight && !isUltraHighlight && (
        <div className="highlight-message">히든번호!</div>
      )}
      {numbers.map((number, index) => (
        <span key={index} className={`numberlist-item ${getClassname(number)}`}>
          {number}
        </span>
      ))}
    </div>
  );
};

export default LotteryNumberList;
