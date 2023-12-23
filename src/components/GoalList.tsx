import React from "react";
import useUserGoals from "../hooks/useUserGoals";
import Goal from "./Goal";
import useUserEmail from "../hooks/useUserEmail";

export default function GoalList() {
  const userEmail = useUserEmail();
  const userGoals = useUserGoals(userEmail);
  return (
    <div>
      {userGoals.map((goal: any, i: number) => (
        <div key={`goalData-${i}`}>
          <Goal goal={goal} />
        </div>
      ))}
    </div>
  );
}
