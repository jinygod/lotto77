import React from "react";
import "./Title.css";

const Title = ({ text, fade }) => {
  return <div className={`title ${fade ? "fade-in" : "fade-out"}`}>{text}</div>;
};

export default Title;
