import React, { useEffect, useState } from "react";
import themeColors from "../styles/themeColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import useStoreGoal from "../hooks/useStoreGoal";
import useUserEmail from "../hooks/useUserEmail";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import useUserGoals from "../hooks/useUserGoals";
import useStoreEntry from "../hooks/useStoreEntry";

type goalType = {
  title: string;
  isComplete: boolean;
};

export default function Goal({ goal }: { goal: any }) {
  const [check, setCheck] = useState<boolean>(goal.isComplete);
  const storeGoal = useStoreGoal();
  const userEmail = useUserEmail();
  const userGoals = useUserGoals(userEmail);
  const storeEntry = useStoreEntry();
  const handleClick = async () => {
    setCheck((p) => !p);
    await storeGoal(userEmail, {
      title: goal.title,
      isComplete: !check,
    });
  };

  useEffect(() => {
    const updateEntry = async () => {
      let today = new Date();
      let completed = userGoals.reduce(
        (count: number, goal: goalType) => (goal.isComplete ? count + 1 : count),
        0
      );
      console.log("length ", userGoals.length, "completed", completed);
      await storeEntry(userEmail, {
        date: today.toISOString().slice(0, 10),
        goalsPercent: Math.floor((completed / userGoals.length) * 100),
        weight: null,
        notes: null,
      });
    };
    updateEntry();
  }, [userGoals, storeEntry, userEmail]);

  const handleDeleteGoal = async () => {
    try {
      if (userEmail) {
        const goalsRef = collection(db, "users", userEmail, "goals");
        await deleteDoc(doc(goalsRef, goal.title));
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="p-3 w-80 m-2 text-white rounded-xl cursor-pointer bg-cyan-700"
        // style={{
        //   backgroundColor: goal.isComplete ? themeColors.green : themeColors.blue,
        // }}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={goal.isComplete ? faCircleCheck : faCircle}
          className="pr-2"
        />
        {goal.title}
      </div>
      <button onClick={handleDeleteGoal}>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-xl text-pink-400 hover:text-pink-800 cursor-pointer p-3 rounded-xl"
          style={{ backgroundColor: themeColors.blue }}
        />
      </button>
    </div>
  );
}
