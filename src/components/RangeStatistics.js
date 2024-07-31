import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./RangeStatistics.css";

// Chart.js 등록 및 플러그인 추가
Chart.register(...registerables, ChartDataLabels);

const RangeStatistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDraw, setStartDraw] = useState(1);
  const [endDraw, setEndDraw] = useState(1130);

  const fetchData = async (start, end) => {
    setLoading(true);
    const docRef = doc(db, "aggregatedData", "lottoStats");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      const filteredData = docData.lottoNumbers.filter(
        (entry) => entry.drwNo >= start && entry.drwNo <= end
      );
      setData(filteredData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(startDraw, endDraw);
  }, [startDraw, endDraw]);

  const handleFetchData = () => {
    fetchData(startDraw, endDraw);
  };

  const processData = () => {
    const bins = [0, 0, 0, 0, 0];

    data.forEach((entry) => {
      entry.numbers.forEach((number) => {
        if (number >= 1 && number <= 10) bins[0]++;
        else if (number >= 11 && number <= 20) bins[1]++;
        else if (number >= 21 && number <= 30) bins[2]++;
        else if (number >= 31 && number <= 40) bins[3]++;
        else if (number >= 41 && number <= 45) bins[4]++;
      });
    });

    return bins;
  };

  const chartData = {
    labels: ["1~10", "11~20", "21~30", "31~40", "41~45"],
    datasets: [
      {
        label: "숫자 출현수",
        data: processData(),
        backgroundColor: [
          "#f2b720", // ball_type1
          "#4072ac", // ball_type2
          "#de4c0e", // ball_type3
          "#9195a4", // ball_type4
          "#13be4b", // ball_type5
        ],
        borderColor: ["#f2b720", "#4072ac", "#de4c0e", "#9195a4", "#13be4b"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart._metasets[0].total;
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
  };

  const binCounts = processData();

  return (
    <div className="statistics-container">
      <div className="form-container">
        <label>
          시작 회차:
          <input
            type="number"
            value={startDraw}
            onChange={(e) => setStartDraw(Number(e.target.value))}
          />
        </label>
        <label>
          종료 회차:
          <input
            type="number"
            value={endDraw}
            onChange={(e) => setEndDraw(Number(e.target.value))}
          />
        </label>
        <button onClick={handleFetchData}>조회</button>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <h2>구간별 통계</h2>
          <div id="chart-container">
            <Pie data={chartData} options={chartOptions} />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>구간</th>
                  <th>숫자 출현수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1~10</td>
                  <td>{binCounts[0]}</td>
                </tr>
                <tr>
                  <td>11~20</td>
                  <td>{binCounts[1]}</td>
                </tr>
                <tr>
                  <td>21~30</td>
                  <td>{binCounts[2]}</td>
                </tr>
                <tr>
                  <td>31~40</td>
                  <td>{binCounts[3]}</td>
                </tr>
                <tr>
                  <td>41~45</td>
                  <td>{binCounts[4]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeStatistics;
