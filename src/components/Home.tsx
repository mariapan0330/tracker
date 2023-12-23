import GoalList from "./GoalList";
import LineChart from "./LineChart";

export default function Home() {
  return (
    <div className="flex flex-col py-12 justify-center items-center">
      <LineChart />
      <GoalList />
    </div>
  );
}
