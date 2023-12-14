import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-around bg-slate-900 p-5 px-16">
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
      <div className="text-yellow-500">Home</div>
      <div className="text-yellow-500">Calendar</div>
      <div className="text-yellow-500">Tracker</div>
    </div>
  );
}
