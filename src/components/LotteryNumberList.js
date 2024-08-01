import React, { useState, useEffect } from "react";
import getClassname from "../utils/getClassname";
import { firework } from "../utils/firework";

const LotteryNumberList = ({ numbers, isHighlight, isUltraHighlight }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isUltraHighlight) {
      firework(); // isUltraHighlight가 true일 때 firework() 호출
    }
  }, [isUltraHighlight]); // isUltraHighlight가 변경될 때마다 호출

  const copyToClipboard = () => {
    const numbersString = numbers.join(",");
    navigator.clipboard
      .writeText(numbersString)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // 2초 후에 메시지 숨기기
      })
      .catch((err) => {
        console.error("클립보드 복사 실패: ", err);
      });
  };

  return (
    <div
      className={`numberlist ${
        isUltraHighlight ? "ultra-highlight" : isHighlight ? "highlight" : ""
      }`}
      onClick={copyToClipboard} // 박스 전체 클릭 시 복사
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
      {copySuccess && (
        <div className="copy-success-message">
          번호가 클립보드에 복사되었습니다.
        </div>
      )}
    </div>
  );
};

export default LotteryNumberList;
