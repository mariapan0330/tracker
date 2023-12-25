import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function NavBar() {
  const [userExists, setUserExists] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setUserExists(auth.currentUser?.email !== undefined);
    });
  }, [userExists]);

  return (
    <div
      className={`
      flex 
      justify-between 
      items-center 
      bg-slate-900 
      p-3 px-5 md:px-16 
      ${!userExists ? "absolute w-screen" : "sticky"}
      top-0 
      z-100 
      `}
    >
      <a href="/">
        <div className="flex">
          <img
            src={require("../images/trackerLogo.png")}
            alt="logo"
            className="h-10 md:h-12 mr-2 md:mr-5 select-none"
          />
          <div className="text-xl md:text-5xl font-bold font-['Righteous'] bg-gradient-to-r from-amber-600 to-yellow-400 bg-clip-text text-transparent select-none">
            GOLDEN ACHIEVER
          </div>
        </div>
      </a>
      {/* <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> */}

      {userExists && (
        <div className="flex flex-col-reverse md:flex-row">
          <div className="text-sm md:text-lg text-yellow-500 md:mr-10">
            <FontAwesomeIcon icon={faCircleUser} /> {auth?.currentUser?.email}
          </div>
          <div
            className="text-sm md:text-lg text-yellow-500 hover:cursor-pointer hover:text-cyan-500 active:text-cyan-800"
            onClick={() => handleSignOut()}
          >
            Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        </div>
      )}
    </div>
  );
}
