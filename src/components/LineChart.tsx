import { useCallback, useEffect, useRef, useState } from "react";
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
import useUserEntries from "../hooks/useUserEntries";
import TimespanSelector from "./TimespanSelector";
import useUserData from "../hooks/useUserEmail";
import LineChartNotes from "./LineChartNotes";
import NewEntryBtn from "./NewEntryBtn";

export default function LineChart() {
  const [selectedTimespan, setSelectedTimespan] = useState<string>("this week");
  const [weightData, setWeightData] = useState<any>([]);
  const [goalsPercentData, setGoalPercentData] = useState<any>([]);
  const [notesData, setNotesData] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  const getStartOfWeek = useCallback((selectedTimespan: string | undefined) => {
    const now = new Date();
    const startOfPeriod = new Date(now);

    if (selectedTimespan === "this month") {
      startOfPeriod.setDate(1); // Set to the first day of the month
    } else if (selectedTimespan === "last month") {
      startOfPeriod.setMonth(startOfPeriod.getMonth() - 1);
      startOfPeriod.setDate(1); // Set to the first day of the last month
    } else if (selectedTimespan === "this year") {
      startOfPeriod.setMonth(0, 1); // Set to the first day of the year
    } else if (selectedTimespan === "last year") {
      startOfPeriod.setFullYear(now.getFullYear() - 1, 0, 1); // Set to the first day of the last year
    } else {
      const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
      startOfPeriod.setDate(now.getDate() - dayOfWeek); // Move to the beginning of the week
    }

    startOfPeriod.setHours(0, 0, 0, 0); // Set time to midnight
    return startOfPeriod;
  }, []);

  const getEndOfWeek = useCallback(
    (selectedTimespan: string | undefined) => {
      const startOfPeriod = getStartOfWeek(selectedTimespan);
      const endOfPeriod = new Date();

      if (selectedTimespan === "this month") {
        const lastDayOfMonth = new Date(
          startOfPeriod.getFullYear(),
          startOfPeriod.getMonth() + 1,
          0
        );
        endOfPeriod.setDate(lastDayOfMonth.getDate()); // Set to the last day of the month
      } else if (selectedTimespan === "last month") {
        endOfPeriod.setDate(0); // Set to the last day of the last month
      } else if (selectedTimespan === "this year") {
        endOfPeriod.setFullYear(startOfPeriod.getFullYear(), 11, 31); // Set to the last day of the year
      } else if (selectedTimespan === "last year") {
        endOfPeriod.setFullYear(startOfPeriod.getFullYear(), 11, 31); // Set to the last day of the last year
      } else {
        endOfPeriod.setDate(startOfPeriod.getDate() + 6); // Move to the end of the week
      }

      endOfPeriod.setHours(23, 59, 59, 999); // Set time to the last millisecond of the day
      return endOfPeriod;
    },
    [getStartOfWeek]
  );

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
    // console.log("dates", dates);
    return dates;
  };

  const startDate = useRef(getStartOfWeek(selectedTimespan));
  const endDate = useRef(getEndOfWeek(selectedTimespan));
  const formattedDatesList = getDatesInRange(startDate.current, endDate.current, true);
  // const datesList = getDatesInRange(startDate, endDate, false);
  useEffect(() => {
    const start = getStartOfWeek(selectedTimespan);
    const end = getEndOfWeek(selectedTimespan);
    startDate.current = start;
    endDate.current = end;
    const findEntriesInRange = () => {
      const filterDates = (index: number) => {
        const currentDate = new Date(startDate.current);
        currentDate.setDate(currentDate.getDate() + index);
        const currentDateStr = currentDate.toISOString().split("T")[0]; // Format: 'YYYY-MM-DD'
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
      const notesInRange: (number | null)[] = Array.from(
        { length: endDate.current.getDate() - startDate.current.getDate() + 1 },
        (_, index) => {
          const res = filterDates(index);
          return res ? res.notes : null;
        }
      );
      // console.log(startDate.current, endDate.current, weightsInRange);
      setWeightData(weightsInRange);
      setGoalPercentData(goalPercentsInRange);
      setNotesData(notesInRange);
    };

    findEntriesInRange();
  }, [userEntries, selectedTimespan, getStartOfWeek, getEndOfWeek]);

  const data = {
    labels: formattedDatesList,
    datasets: [
      {
        label: "% of Goals Completed",
        data: goalsPercentData,
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

  const handleClick = (_: any, elements: any) => {
    if (elements && elements[0] !== null && elements[0] !== undefined) {
      setSelectedIndex(elements[0].index);
    } else {
      setSelectedIndex(null);
    }
  };
  const options = {
    onClick: handleClick,
    responsive: true,
    spanGaps: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      tooltip: { enabled: false },
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
    <div className="flex justify-center items-center">
      <div className="pb-36">
        <TimespanSelector setSelectedTimespan={setSelectedTimespan} />

        <h1 className="flex justify-center items-end text-3xl md:text-6xl font-bold font-['Righteous'] bg-gradient-to-t from-[#22a5ba] to-[#fcfd7f] bg-clip-text text-transparent">
          {selectedTimespan.toUpperCase()}
          <span className="text-5xl pl-5">
            {startDate.current.getMonth() + 1}.{startDate.current.getDate()}.
            {startDate.current.getFullYear()} to {endDate.current.getMonth() + 1}.
            {endDate.current.getDate()}.{endDate.current.getFullYear()}
          </span>
        </h1>

        <div
          className={`flex flex-col md:flex-row justify-center bg-[#11172980] md:h-4/6 p-5 md:px-10 rounded-3xl`}
        >
          <Line data={data} options={options as any} />
          <div className="flex flex-col">
            <LineChartNotes
              weightData={weightData}
              goalsPercentData={goalsPercentData}
              notesData={notesData}
              dates={getDatesInRange(startDate.current, endDate.current, true)}
              index={selectedIndex}
            />
            <NewEntryBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
