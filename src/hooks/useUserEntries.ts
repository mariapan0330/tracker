import { CollectionReference, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";

const useUserEntries = (email: string | null) => {
  const [userEntries, setUserEntries] = useState<any>([]);
  const entriesRef = useRef<CollectionReference | null>(null);

  useEffect(() => {
    if (email) {
      entriesRef.current = collection(db, "users", email, "entries");

      // Set up the snapshot listener
      const unsubscribe = onSnapshot(entriesRef.current, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserEntries(data);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [email]);

  return userEntries;
};

export default useUserEntries;
