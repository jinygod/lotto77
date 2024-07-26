const generateNewNumbers = (fixedNumbers) => {
  let allNumbers = [];
  let highlightIndexes = [];
  let ultraHighlightIndex = null;

  for (let i = 0; i < 5; i++) {
    let numbers = [...fixedNumbers]; // 고정 숫자를 포함시킵니다.
    while (numbers.length < 6) {
      let randomNum = Math.ceil(Math.random() * 45);
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b); // 오름차순 정렬
    allNumbers.push(numbers);

    // 8% 확률로 highlightIndex 추가
    if (Math.random() < 0.08) {
      highlightIndexes.push(i);
    }

    // 0.19% 확률로 ultraHighlightIndex 설정
    if (Math.random() < 0.0019) {
      ultraHighlightIndex = i;
    }
  }

  return { allNumbers, highlightIndexes, ultraHighlightIndex };
};

export default generateNewNumbers;
