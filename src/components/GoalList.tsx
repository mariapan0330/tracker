import useUserGoals from "../hooks/useUserGoals";
import Goal from "./Goal";
import useUserEmail from "../hooks/useUserEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useStoreGoal from "../hooks/useStoreGoal";
import themeColors from "../styles/themeColors";
import useDailyGoalReset from "../hooks/useDailyGoalReset";

export default function GoalList() {
  const [newGoal, setNewGoal] = useState<string>("");
  const userEmail = useUserEmail();
  const shouldResetGoals = useDailyGoalReset(userEmail);
  const userGoals = useUserGoals(userEmail);
  const storeGoal = useStoreGoal();
  const handleSubmitNewGoal = () => {
    if (newGoal) {
      storeGoal(userEmail, {
        title: newGoal,
      });
      setNewGoal("");
    }
  };
  useEffect(() => {
    // Reset isComplete fields if shouldResetGoals is true
    if (shouldResetGoals) {
      userGoals.forEach(async (goal: any) => {
        await storeGoal(userEmail, {
          title: goal.title,
          isComplete: false,
        });
      });
    }
  }, [shouldResetGoals, userGoals, storeGoal, userEmail]);

  return (
    <div>
      <h1 className="flex justify-center items-end text-3xl md:text-6xl font-bold font-['Righteous'] bg-gradient-to-t from-[#22a5ba] to-[#fcfd7f] bg-clip-text text-transparent">
        DAILY GOALS
      </h1>
      {userGoals.map((goal: any, i: number) => (
        <div key={`goalData-${i}`}>
          <Goal goal={goal} />
        </div>
      ))}
      <div className="flex justify-between items-center">
        <div
          className="pl-3 w-80 m-2 text-white rounded-xl flex justify-start items-center"
          style={{ backgroundColor: themeColors.blue }}
        >
          <FontAwesomeIcon icon={faPlus} className="pr-2" />
          <input
            type="text"
            placeholder="Add New Goal..."
            value={newGoal}
            className="rounded-lg p-3 w-full bg-transparent text-white"
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </div>

        <button disabled={newGoal === ""} onClick={handleSubmitNewGoal}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-xl text-slate-800 cursor-pointer p-3 rounded-xl bg-yellow-500 hover:bg-yellow-600"
          />
        </button>
      </div>
    </div>
  );
}
