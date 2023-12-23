import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useDailyGoalReset = (userEmail: string | null) => {
  const [shouldResetGoals, setShouldResetGoals] = useState(false);

  useEffect(() => {
    const checkAndResetGoals = async () => {
      if (userEmail) {
        const userDocRef = doc(db, "users", userEmail);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData) {
          const lastVisited = userData.lastVisited;
          const today = new Date().toISOString().slice(0, 10);

          if (lastVisited !== today) {
            // Update lastVisited to today
            await setDoc(userDocRef, { lastVisited: today }, { merge: true });

            // Set the flag to indicate that goals should be reset
            setShouldResetGoals(true);
          }
        }
      }
    };

    checkAndResetGoals();
  }, [userEmail]);

  return shouldResetGoals;
};

export default useDailyGoalReset;
