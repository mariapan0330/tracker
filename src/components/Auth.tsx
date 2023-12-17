import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [retypePw, setRetypePw] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  // const [userExists, setUserExists] = useState<boolean>();
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
    } catch (error: any) {
      console.log(error.message);
      setAuthError(error.message.slice(10));
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
    } catch (error: any) {
      console.log(error.message);
      setAuthError(error.message.slice(10));
    }
  };

  useEffect(() => {
    if (pw !== retypePw && isSigningUp) {
      setAuthError("Passwords don't match.");
    } else {
      setAuthError("");
    }
  }, [pw, retypePw, isSigningUp]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="
        w-11/12 md:w-auto
      flex flex-col justify-center items-center 
      p-5 md:p-20
      bg-[#111729] 
      rounded-xl md:rounded-3xl 
      shadow-lg
      "
      >
        <h1 className="text-[#22A5BA] text-3xl font-['Righteous']">Email</h1>
        <input
          placeholder="Email..."
          className="bg-[#212E53] text-yellow-100 p-2 md:p-5 text-lg font-mono rounded-xl"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h1 className="text-[#8ACF9D] text-3xl font-['Righteous'] pt-8">Password</h1>
        <input
          placeholder="Password..."
          className="bg-[#212E53] text-yellow-100 p-2 md:p-5 text-lg font-mono rounded-xl"
          type="password"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />

        {isSigningUp && (
          <>
            <h1
              className="
            text-[#FCFD7F] text-3xl font-['Righteous'] pt-8"
            >
              Retype Password
            </h1>
            <input
              placeholder="Password..."
              className="bg-[#212E53] text-yellow-100 p-2 md:p-5 text-lg font-mono rounded-xl"
              type="password"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
          </>
        )}

        <div className="text-pink-800 mt-8 mb-1">{authError ? authError : ""}</div>
        <button
          className="
            p-1 md:p-3 px-10 md:px-20 
            rounded-xl
            text-xl md:text-3xl font-['Righteous'] 
            bg-gradient-to-t
            from-amber-600
            to-amber-400
            hover:from-[#8ACF9D]
            hover:to-cyan-600 
            active:from-cyan-900
            active:bg-cyan-950"
          onClick={isSigningUp ? signUp : signIn}
        >
          {isSigningUp ? "Sign Up" : "Log In"}
        </button>
        <div
          className="
        flex 
        justify-center
        pt-5 
      text-white 
        text-md md:text-xl 
        font-['Righteous'] 
        underline underline-offset-2 
        hover:underline-offset-8 
        hover:cursor-pointer 
        active:text-cyan-600
        "
          onClick={() => setIsSigningUp((p) => !p)}
        >
          {isSigningUp ? "Log In" : "Sign Up"}
        </div>
      </div>
    </div>
  );
}
