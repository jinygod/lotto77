import React, { useState } from "react";
import RangeStatistics from "./RangeStatistics";
import NumberStatistics from "./NumberStatistics";
import "./StatisticsPage.css";

const StatisticsPage = () => {
  const [view, setView] = useState("range"); // "range" 또는 "number"로 설정

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="statistics-page">
      <div className="view-selector">
        <button onClick={() => handleViewChange("range")}>구간별 통계</button>
        <button onClick={() => handleViewChange("number")}>번호별 통계</button>
      </div>
      <div className="statistics-content">
        {view === "range" && <RangeStatistics />}
        {view === "number" && <NumberStatistics />}
      </div>
    </div>
  );
};

export default StatisticsPage;
