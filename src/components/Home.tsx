import LineChart from "./LineChart";
import Auth from "./Auth";
import NewEntryForm from "./NewEntryForm";

export default function Home() {
  return (
    <div className="flex flex-col py-12 justify-center items-center">
      <LineChart />
      <NewEntryForm />
    </div>
  );
}
