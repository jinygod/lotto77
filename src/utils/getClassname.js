const getClassname = (number) => {
  if (number >= 1 && number <= 10) {
    return "ball_type1";
  } else if (number >= 11 && number <= 20) {
    return "ball_type2";
  } else if (number >= 21 && number <= 30) {
    return "ball_type3";
  } else if (number >= 31 && number <= 40) {
    return "ball_type4";
  } else if (number >= 41 && number <= 45) {
    return "ball_type5";
  }
};

export default getClassname;
