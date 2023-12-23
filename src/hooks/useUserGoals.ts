import { CollectionReference, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";

const useUserGoals = (email: string | null) => {
  const [userGoals, setUserGoals] = useState<any>([]);
  const goalsDataRef = useRef<CollectionReference | null>(null);

  // useEffect(() => {
  //   if (email) {
  //     goalsDataRef.current = collection(db, "users", email, "goals");
  //   }
  // }, [email]);
  useEffect(() => {
    if (email) {
      const goalsRef = collection(db, "users", email, "goals");
      const unsubscribe = onSnapshot(goalsRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserGoals(data);
      });

      return () => unsubscribe();
    }
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (goalsDataRef.current) {
          const res = await getDocs(goalsDataRef.current);
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setUserGoals(data);
          console.log("goal data: ", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return userGoals;
};

export default useUserGoals;
