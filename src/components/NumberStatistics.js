import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./NumberStatistics.css";

// Chart.js 등록 및 플러그인 추가
Chart.register(...registerables, ChartDataLabels);

const NumberStatistics = () => {
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

  const processNumberData = () => {
    const counts = Array(45).fill(0);

    data.forEach((entry) => {
      entry.numbers.forEach((number) => {
        counts[number - 1]++;
      });
    });

    return counts;
  };

  const chartData = {
    labels: Array.from({ length: 45 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: "숫자 출현수",
        data: processNumberData(),
        backgroundColor: [
          ...Array(10).fill("#f2b720"),
          ...Array(10).fill("#4072ac"),
          ...Array(10).fill("#de4c0e"),
          ...Array(10).fill("#9195a4"),
          ...Array(5).fill("#13be4b"),
        ],
        borderColor: [
          ...Array(10).fill("#f2b720"),
          ...Array(10).fill("#4072ac"),
          ...Array(10).fill("#de4c0e"),
          ...Array(10).fill("#9195a4"),
          ...Array(5).fill("#13be4b"),
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  const numberCounts = processNumberData();

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
          <h2>번호별 통계</h2>
          <div id="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>숫자 출현수</th>
                </tr>
              </thead>
              <tbody>
                {numberCounts.map((count, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberStatistics;
