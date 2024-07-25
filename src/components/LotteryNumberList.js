import React from "react";
import getClassname from "../utils/getClassname";

const LotteryNumberList = ({ numbers, isHighlight, isUltraHighlight }) => {
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
