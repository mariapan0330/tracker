import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import themeFonts from "../styles/themeFonts";

export default function Footer() {
  return (
    <div
      className="
    flex flex-col md:flex-row 
    justify-between items-center
    bottom-0 p-4 px-8 
    bg-slate-900 text-yellow-500
    "
      style={{ fontFamily: themeFonts.subtitle }}
    >
      <div className="flex font-bold">
        <p className="pr-5">Designed by Angelina Panagos</p>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/mariapan0330/tracker"
            target="_blank"
            rel="noreferrer"
          >
            Maria Panagos
          </a>
        </p>
      </div>
      <p>
        Merry Christmas 2023 <FontAwesomeIcon icon={faHeart} />
      </p>
    </div>
  );
}
