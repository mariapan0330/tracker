import { useEffect, useRef, useState } from "react";
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
import themeFonts from "../styles/themeFonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useUserEntries from "../hooks/useUserEntries";
import TimespanSelector from "./TimespanSelector";
import useUserData from "../hooks/useUserEmail";

export default function LineChart() {
  const [selectedTimespan, setSelectedTimespan] = useState<string>();
  const [weightData, setWeightData] = useState<any>([]);
  const [goalPercentData, setGoalPercentData] = useState<any>([]);
  const userEmail = useUserData();
  const userEntries = useUserEntries(userEmail);
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip
  );

  const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek); // Move to the beginning of the week
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
    return startOfWeek;
  };

  const getEndOfWeek = () => {
    const startOfWeek = getStartOfWeek();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Move to the end of the week
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the last millisecond of the day
    return endOfWeek;
  };

  const getDatesInRange = (startDate: Date, endDate: Date, humanReadable: boolean) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (humanReadable) {
        dates.push(currentDate.toDateString()); // Format the date as a human-readable string
      } else {
        dates.push(
          `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        );
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dates;
  };

  const startDate = useRef(getStartOfWeek());
  const endDate = useRef(getEndOfWeek());
  const formattedDatesList = getDatesInRange(startDate.current, endDate.current, true);
  // const datesList = getDatesInRange(startDate, endDate, false);
  useEffect(() => {
    const findEntriesInRange = () => {
      const filterDates = (index: number) => {
        const currentDate = new Date(startDate.current);
        currentDate.setDate(currentDate.getDate() + index);
        const currentDateStr = currentDate.toISOString().split("T")[0]; // Format: 'YYYY-MM-DD'
        console.log(currentDateStr);
        const entry = userEntries.find((date: any) => date.date === currentDateStr);
        return entry ? entry : null;
      };
      const weightsInRange: (number | null)[] = Array.from(
        { length: endDate.current.getDate() - startDate.current.getDate() + 1 },
        (_, index) => {
          const res = filterDates(index);
          return res ? res.weight : null;
        }
      );
      const goalPercentsInRange: (number | null)[] = Array.from(
        { length: endDate.current.getDate() - startDate.current.getDate() + 1 },
        (_, index) => {
          const res = filterDates(index);
          return res ? res.goalsPercent : null;
        }
      );
      setWeightData(weightsInRange);
      setGoalPercentData(goalPercentsInRange);
    };

    findEntriesInRange();
  }, [userEntries]);

  const data = {
    labels: formattedDatesList,
    datasets: [
      {
        label: "% of Goals Completed",
        data: goalPercentData,
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
        data: weightData,
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
    spanGaps: true,
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
        min: 0,
        ticks: { color: themeColors.green },
        border: { color: themeColors.white },
      },
      x: {
        ticks: { color: themeColors.green, maxRotation: 30, minRotation: 30 },
        border: { color: themeColors.white },
      },
    },
  };

  return (
    <div className="w-5/6 md:w-3/4 pb-40 md:h-screen">
      <TimespanSelector setSelectedTimespan={setSelectedTimespan} />

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
          className="items-center justify-center flex p-2 px-3 text-xl rounded-xl"
        >
          <FontAwesomeIcon icon={faPlus} className="pr-2" /> New Entry
        </Link>
      </div>
      <div>Your data</div>
      <div>
        {userEntries.map((item: any, i: number) => (
          <div key={`dateData-${i}`}>{item.date}</div>
        ))}
      </div>
    </div>
  );
}
