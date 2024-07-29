import React from "react";
import "./LotteryImage.css";

const LotteryImage = () => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/main.png`}
      alt="Lotto"
      className="lotto-image"
    />
  );
};

export default LotteryImage;
