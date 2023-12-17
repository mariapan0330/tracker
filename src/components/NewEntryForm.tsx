import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle as solidCircle,
  faPlus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as openCircle } from "@fortawesome/free-regular-svg-icons";

interface UserLine {
  title: string;
  color: string;
}

interface UserLines {
  [key: string]: UserLine;
}

export default function NewEntryForm() {
  const [userLines] = useState<UserLines>({
    "0": {
      title: "weight",
      color: "#8ACF9D",
    },
    "1": {
      title: "% of goals completed",
      color: "#22A5BA",
    },
  });
  const [selectedLine, setSelectedLine] = useState<string | undefined>();
  const [newLine, setNewLine] = useState<string | undefined>();

  return (
    <div>
      <div>New Entry</div>
      <div>Date</div>
      <input placeholder="date" type="date" />
      <div>Line</div>
      {Object.keys(userLines).map((line) => (
        <div
          className="flex items-center hover:cursor-pointer"
          style={{ color: userLines[line]["color"] }}
          onClick={() => setSelectedLine(userLines[line]["title"])}
        >
          {selectedLine === userLines[line].title ? (
            <FontAwesomeIcon icon={solidCircle} />
          ) : (
            <FontAwesomeIcon icon={openCircle} />
          )}
          <label className="pl-3 hover:cursor-pointer"> {userLines[line].title}</label>
        </div>
      ))}
      <div
        className="flex items-center hover:cursor-pointer text-white"
        onClick={() => setSelectedLine("new")}
      >
        {selectedLine === "new" ? (
          <FontAwesomeIcon icon={faCirclePlus} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
        <input
          type="text"
          placeholder="New Line..."
          className="ml-3 pl-3 rounded-md text-black"
          onChange={(e) => setNewLine(e.target.value)}
        />
      </div>
      <div>Value</div>
      <div className="flex">
        <input type="number" placeholder="Enter a number" className="mr-3" />
        {/* <input type="" /> */}
      </div>
    </div>
  );
}
