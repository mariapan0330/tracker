import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useStoreGoal = () => {
  const storeGoal = async (email: string | null, goalData: any): Promise<boolean> => {
    if (!email) {
      console.log("no email, so can't store stuff");
      return false;
    }
    try {
      const docRef = doc(db, "users", email, "goals", goalData.title);
      await setDoc(docRef, goalData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error storing goal:", error);
      return false;
    }
  };
  return storeGoal;
};
export default useStoreGoal;
