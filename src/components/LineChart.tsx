import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import themeColors from "../styles/themeColors";
import { db } from "../config/firebase";
import { CollectionReference, collection, getDocs } from "firebase/firestore";

export default function LineChart() {
  const [userData, setUserData] = useState<any>([]);
  // const datesCollection = collection(db, "");
  const datesData = collection(db, "users", "maria.pan0330@gmail.com", "12 2023");
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip
  );
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "% of Goals Completed",
        data: [10, 20, 50, 22, 75, 100, 90],
        backgroundColor: themeColors.teal,
        pointRadius: 6,
        borderColor: themeColors.teal,
        borderWidth: 8,
        pointBorderColor: themeColors.white,
        pointBorderWidth: 2,
        tension: 0.1,
      },
      {
        label: "Weight",
        data: [200, 210, 230, 220, 200, 200, 205],
        backgroundColor: themeColors.green,
        pointRadius: 6,
        borderColor: themeColors.green,
        borderWidth: 8,
        pointBorderColor: themeColors.white,
        pointBorderWidth: 2,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: themeColors.white,
          usePointStyle: true,
          pointStyle: "square",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: themeColors.green },
        border: { color: themeColors.white },
      },
      x: {
        ticks: { color: themeColors.green },
        border: { color: themeColors.white },
      },
    },
  };

  useEffect(() => {
    const getUserData = async () => {
      // read data from db and set userData state to that.
      try {
        const res = await getDocs(datesData);
        const data = res.docs.map((doc) => ({ ...doc.data(), data: doc.id }));
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="w-5/6 md:w-3/4 pb-40 md:h-screen">
      <h1 className="flex justify-center text-3xl md:text-6xl font-bold font-['Righteous'] bg-gradient-to-t from-[#22a5ba] to-[#fcfd7f] bg-clip-text text-transparent">
        THIS WEEK 12.10.23 - 12.16.23
      </h1>
      <div className={`flex justify-center bg-[#11172980] p-5 md:px-20 rounded-3xl`}>
        <Line data={data} options={options as any} />
      </div>
      <div>Your data</div>
      <div>
        {userData.map((item: any, i: number) => (
          <div key={`dateData-${i}`}>{item.notes}</div>
        ))}
      </div>
    </div>
  );
}
