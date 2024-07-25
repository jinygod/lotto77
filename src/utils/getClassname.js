const getClassname = (number) => {
  if (number >= 1 && number <= 10) {
    return "yellow";
  } else if (number >= 11 && number <= 20) {
    return "skyblue";
  } else if (number >= 21 && number <= 30) {
    return "lightpink";
  } else if (number >= 31 && number <= 40) {
    return "gray";
  } else if (number >= 41 && number <= 45) {
    return "green";
  }
};

export default getClassname;
