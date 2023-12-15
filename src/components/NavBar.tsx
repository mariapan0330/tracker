import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-start items-center bg-slate-900 p-3 px-16 sticky top-0">
      <a href="/">
        <div className="flex">
          <img
            src={require("../images/trackerLogo.png")}
            alt="logo"
            className="w-16 mr-5 select-none"
          />
          <div className="text-5xl font-bold font-['Righteous'] bg-gradient-to-r from-cyan-600 to-yellow-200 bg-clip-text text-transparent select-none">
            TRACKER
          </div>
        </div>
      </a>
    </div>
  );
}
