import { CollectionReference, collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";

const useUserEntries = (email: string | null) => {
  const [userEntries, setUserEntries] = useState<any>([]);
  // const tRef = useRef(new Date());
  // const { current: t } = tRef;
  // const datesDataRef = useRef(
  //   collection(db, "users", email, `${t.getMonth() + 1} ${t.getFullYear()}`)
  // );
  // const { current: datesData } = datesDataRef;
  const entriesRef = useRef<CollectionReference | null>(null);

  useEffect(() => {
    if (email) {
      entriesRef.current = collection(db, "users", email, "entries");
    }
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          if (entriesRef.current) {
            const res = await getDocs(entriesRef.current);
            const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserEntries(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [entriesRef, email]);

  return userEntries;
};

export default useUserEntries;
