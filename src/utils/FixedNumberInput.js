import React, { useState } from "react";

const FixedNumberInput = ({ onFixedNumbersChange, fixedNumbers = [] }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddNumber = (e) => {
    e.preventDefault();
    const number = parseInt(inputValue);
    if (number >= 1 && number <= 45 && !isNaN(number)) {
      onFixedNumbersChange((prev) => {
        if (prev.includes(number) || prev.length >= 5) return prev;
        return [...prev, number];
      });
      setInputValue("");
    }
  };

  const handleRemoveNumber = (numberToRemove) => {
    onFixedNumbersChange((prev) =>
      prev.filter((number) => number !== numberToRemove)
    );
  };

  return (
    <div>
      <form onSubmit={handleAddNumber} className="fixed-number-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1"
          max="45"
          placeholder="1~45의 숫자를 넣어주세요"
          required
        />
        <button type="submit" className="add-number-button">
          고정번호추가
        </button>
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
