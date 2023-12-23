import React from "react";
import themeColors from "../styles/themeColors";
import themeFonts from "../styles/themeFonts";

export default function TimespanSelector({
  setSelectedTimespan,
}: {
  setSelectedTimespan: any;
}) {
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
      >
        <option value="this week" onSelect={() => setSelectedTimespan("this week")}>
          This Week
        </option>
        <option value="this month" onSelect={() => setSelectedTimespan("this month")}>
          This Month
        </option>
        <option value="last 30 days" onSelect={() => setSelectedTimespan("last 30 days")}>
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
  );
}
