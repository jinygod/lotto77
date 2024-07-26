import React, { useState } from "react";

const FixedNumberInput = ({ onFixedNumbersChange, fixedNumbers = [] }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddNumber = (e) => {
    e.preventDefault();
    const number = parseInt(inputValue);

    if (isNaN(number) || number < 1 || number > 45) {
      setError("1~45의 숫자를 넣어주세요");
      setTimeout(() => setError(""), 3000); // 3초 후에 오류 메시지 사라짐
      return;
    }

    if (fixedNumbers.includes(number)) {
      setError("이미 등록한 숫자입니다");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (fixedNumbers.length >= 5) {
      setError("최대 5개의 숫자만 등록할 수 있습니다");
      setTimeout(() => setError(""), 3000);
      return;
    }

    onFixedNumbersChange((prev) => [...prev, number]);
    setInputValue("");
    setError("");
  };

  const handleRemoveNumber = (numberToRemove) => {
    onFixedNumbersChange((prev) =>
      prev.filter((number) => number !== numberToRemove)
    );
  };

  return (
    <div className="fixed-number-container">
      <form onSubmit={handleAddNumber} className="fixed-number-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="1~45의 숫자를 넣어주세요"
          required
          className="number-input"
        />
        <button className="add-fixed-number-button">+ 고정번호추가</button>
        {error && (
          <div className="error-icon">
            <span className="error-message">{error}</span>
          </div>
        )}
      </form>
      <div className="fixed-number-list">
        {fixedNumbers.map((number, index) => (
          <span
            key={index}
            className="fixed-number-item"
            onClick={() => handleRemoveNumber(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FixedNumberInput;
