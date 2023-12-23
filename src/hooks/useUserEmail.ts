import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

const useUserEmail = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return email;
};

export default useUserEmail;
