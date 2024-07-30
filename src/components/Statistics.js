import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { collection, onSnapshot } from "firebase/firestore";
import "./Statistics.css";

// Chart.js 등록
Chart.register(...registerables);

const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "lottoNumbers"),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => doc.data());
        setData(dataList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

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
        label: "빈도수",
        data: processData(),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistics-container">
      <h1>로또 통계 페이지</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <h2>번호 구간별 통계</h2>
          <div id="chart-container">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
