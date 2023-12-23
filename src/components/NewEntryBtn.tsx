import { Link } from "react-router-dom";
import themeFonts from "../styles/themeFonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NewEntryBtn() {
  return (
    <div className="flex justify-center items-center">
      <Link
        to="/new-entry-form"
        style={{
          fontFamily: themeFonts.subtitle,
        }}
        className="flex items-center justify-center 
      p-8
      rounded-xl 
      text-2xl font-bold
      bg-gradient-to-t
      from-amber-600
      to-amber-400
      hover:from-[#8ACF9D]
      hover:to-cyan-600 
      active:from-cyan-900
      active:bg-cyan-950"
      >
        <FontAwesomeIcon icon={faPlus} className="pr-2" /> New Entry
      </Link>
    </div>
  );
}
