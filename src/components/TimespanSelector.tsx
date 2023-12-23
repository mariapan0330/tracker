import React from "react";
import themeColors from "../styles/themeColors";
import themeFonts from "../styles/themeFonts";

export default function TimespanSelector({
  setSelectedTimespan,
}: {
  setSelectedTimespan: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSetTimespan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimespan(event.target.value);
  };
  return (
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
        onChange={handleSetTimespan}
      >
        <option value="this week">This Week</option>
        <option value="this month">This Month</option>
        <option value="last month">Last Month</option>
        <option value="this year">This Year</option>
        <option value="last year">Last Year</option>
      </select>
    </div>
  );
}
