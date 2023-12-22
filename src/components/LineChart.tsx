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
import { collection, getDocs } from "firebase/firestore";
import themeFonts from "../styles/themeFonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import NewEntryForm from "./NewEntryForm";

export default function LineChart() {
  const [userData, setUserData] = useState<any>([]);
  const [selectedTimespan, setSelectedTimespan] = useState<string>();
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
      <div className="flex justify-center items-center">
        <select
          name="timespan"
          id="timespan"
          style={{
            backgroundColor: themeColors.darkBlue,
            fontFamily: themeFonts.subtitle,
            color: themeColors.yellow,
          }}
          className="p-2 px-8 rounded-xl text-lg font-bold"
        >
          <option value="this week" onSelect={() => setSelectedTimespan("this week")}>
            This Week
          </option>
          <option value="this month" onSelect={() => setSelectedTimespan("this month")}>
            This Month
          </option>
          <option
            value="last 30 days"
            onSelect={() => setSelectedTimespan("last 30 days")}
          >
            Last 30 Days
          </option>
          <option value="this year" onSelect={() => setSelectedTimespan("this year")}>
            This Year
          </option>
          <option value="last year" onSelect={() => setSelectedTimespan("last year")}>
            Last Year
          </option>
        </select>
      </div>

      <h1 className="flex justify-center text-3xl md:text-6xl font-bold font-['Righteous'] bg-gradient-to-t from-[#22a5ba] to-[#fcfd7f] bg-clip-text text-transparent">
        THIS WEEK 12.10.23 - 12.16.23
      </h1>
      <div
        className={`flex justify-center bg-[#11172980] md:h-4/6 p-5 md:px-20 rounded-3xl`}
      >
        <Line data={data} options={options as any} />
      </div>
      <div className="flex justify-center items-center p-4">
        <Link
          to="/new-entry-form"
          style={{ backgroundColor: themeColors.green, fontFamily: themeFonts.subtitle }}
          className="items-center justify-center flex p-2 px-3 text-xl rounded-3xl"
        >
          <FontAwesomeIcon icon={faPlus} className="pr-2" /> New Entry
        </Link>
      </div>
      {/* <div>Your data</div>
      <div>
        {userData.map((item: any, i: number) => (
          <div key={`dateData-${i}`}>{item.notes}</div>
        ))}
      </div> */}
    </div>
  );
}
