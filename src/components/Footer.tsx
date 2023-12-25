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
      bottom-0 p-4 px-8 md:pr-12
      bg-slate-900 text-yellow-500
      box-border w-screen
      overflow-x-hidden
      "
      style={{ fontFamily: themeFonts.subtitle }}
    >
      <div className="flex flex-col md:flex-row font-bold text-center md:text-start">
        <p className="md:pr-5">
          Designed by <span>Angelina Panagos</span>
        </p>
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
