import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useStoreEntry = () => {
  const storeEntry = async (email: string | null, entryData: any): Promise<boolean> => {
    if (!email) {
      console.log("no email, so can't store stuff");
      return false;
    }
    try {
      console.log("USESTORE selectedDate: ", entryData.date);
      const datesData = doc(db, "users", email, "entries", entryData.date);

      let validData = {};
      if (entryData.weight) {
        validData = { ...validData, weight: entryData.weight };
      }
      if (entryData.goalsPercent) {
        validData = { ...validData, goalsPercent: entryData.goalsPercent };
      }
      validData = { ...validData, date: entryData.date, notes: entryData.notes };
      await setDoc(datesData, validData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error storing entry:", error);
      return false;
    }
  };
  return storeEntry;
};
export default useStoreEntry;
