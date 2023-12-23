import themeColors from "../styles/themeColors";
import themeFonts from "../styles/themeFonts";

type LineChartNotesTypes = {
  weightData: (number | null)[];
  goalsPercentData: (number | null)[];
  notesData: (string | null)[];
  dates: string[];
  index: number | null;
};

export default function LineChartNotes({
  weightData,
  goalsPercentData,
  notesData,
  dates,
  index,
}: LineChartNotesTypes) {
  return (
    <div className="flex-1 grow md:p-10">
      <div className="text-xl" style={{ fontFamily: themeFonts.subtitle }}>
        <div className="text-2xl font-bold text-yellow-500 pb-4">
          {index ? dates[index] : "Select a day"}
        </div>
        <hr className="border-yellow-500 border-t-2" />
        <div className="text-white py-2">
          <span className="font-bold" style={{ color: themeColors.teal }}>
            Goals Completed:
          </span>{" "}
          {index ? `${goalsPercentData[index] || "??"}%` : "Select a day"}
        </div>
        <div className="text-white py-2">
          <span className="font-bold" style={{ color: themeColors.green }}>
            Weight:
          </span>{" "}
          {index ? `${weightData[index] || "??"} lbs` : "Select a day"}
        </div>
        <div className="text-white py-2">
          <span className="font-bold" style={{ color: themeColors.yellow }}>
            Notes:
          </span>{" "}
          {index ? notesData[index] || "None" : "Select a day"}
        </div>
      </div>
    </div>
  );
}
