import React from "react";
import themeColors from "../styles/themeColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export default function Goal({ goal }: { goal: any }) {
  const handleClick = () => {};
  return (
    <div
      className="p-3 w-80 m-4 text-white rounded-xl"
      style={{ backgroundColor: goal.isComplete ? themeColors.teal : themeColors.blue }}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={goal.isComplete ? faCircleCheck : faCircle}
        className="pr-2"
      />
      {goal.title}
    </div>
  );
}
