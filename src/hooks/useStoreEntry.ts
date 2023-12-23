import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useStoreEntry = () => {
  const storeEntry = async (
    email: string | null,
    entryData: any,
    userEntries: any
  ): Promise<boolean> => {
    if (!email) {
      console.log("no email, so can't store stuff");
      return false;
    }
    try {
      console.log("USESTORE selectedDate: ", entryData.date);
      const datesData = doc(db, "users", email, "entries", entryData.date);
      const mergedData = { ...entryData, ...userEntries[entryData.date] };
      console.log(mergedData);

      let validData = {};
      if (entryData.weight) {
        validData = { ...validData, weight: entryData.weight };
      }
      if (entryData.goalsPercent) {
        validData = { ...validData, goalsPercent: entryData.goalsPercent };
      }
      await updateDoc(datesData, validData);
      return true;
    } catch (error) {
      console.error("Error storing entry:", error);
      return false;
    }
  };
  return storeEntry;
};
export default useStoreEntry;
