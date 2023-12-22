import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import themeColors from "../styles/themeColors";
import themeFonts from "../styles/themeFonts";

export default function NewEntryForm() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>("");
  const [weight, setWeight] = useState<string | undefined>("");
  const [goalsPercent, setGoalPercent] = useState<string | undefined>("");
  const [notes, setNotes] = useState<string | undefined>("");
  const [submitError, setSubmitError] = useState<string | undefined>("");
  const [submitError2, setSubmitError2] = useState<string | undefined>("");
  const t = new Date();
  const today = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;

  const datesData = collection(db, "users", "maria.pan0330@gmail.com", "12 2023");
  const handleSubmit = async () => {
    if (submitError2 === "" && selectedDate && (weight || goalsPercent || notes)) {
      try {
        await addDoc(datesData, {
          date: selectedDate ? selectedDate : null,
          weight: weight ? Number(weight) : null,
          goalsPercent: goalsPercent ? Number(goalsPercent) : null,
          notes: notes ? notes : null,
        });
        setSubmitError("");
        setSubmitError2("");
        setSelectedDate("");
        setWeight("");
        setGoalPercent("");
        setNotes("");
        alert("Yeah I'm pretty sure that worked!");
      } catch (error) {
        console.error(error);
        setSubmitError("ERROR on my end sorry :(((");
      }
    } else {
      setSubmitError("Select a date and enter at least one field to submit.");
    }
  };

  useEffect(() => {
    if (selectedDate && (weight || goalsPercent || notes)) {
      setSubmitError("");
    } else {
      setSubmitError("Select a date and enter at least one field to submit.");
    }
  }, [selectedDate, weight, goalsPercent, notes]);

  useEffect(() => {
    if (selectedDate) {
      let sel = new Date(selectedDate);
      let [y] = selectedDate.split("-");

      if (sel > t) {
        setSubmitError2("Sorry, you can't choose a date that's in the future.");
      } else {
        setSubmitError2("");
      }

      if (Number(y) < 2000) {
        setSubmitError2("Sorry, that's waaaaay too long ago.");
      }
    }
  }, [selectedDate]);

  return (
    <div
      className="
      flex flex-col justify-center items-center
      w-3/4 md:w-1/2
      p-10 rounded-3xl 
      select-none
      "
      style={{ backgroundColor: themeColors.darkBlue, fontFamily: themeFonts.subtitle }}
    >
      <div className="text-3xl text-white">New Entry</div>
      <div className="text-yellow-500 font-bold">Date</div>
      <input
        placeholder="date"
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        value={selectedDate}
        onBlur={() => {
          if (selectedDate) {
            let [y, m, d] = selectedDate?.split("-");
            y =
              Number(y) > 2023
                ? "2023"
                : Number(y) < 2000
                ? "2000"
                : Number(y).toString();
            setSelectedDate(`${y}-${m}-${d}`);
          }
        }}
      />
      <div style={{ color: "#8ACF9D" }} className="font-bold">
        Weight
      </div>
      <div className="flex">
        <input
          type="number"
          placeholder="Enter a number"
          value={weight}
          className="mr-3"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          onBlur={() => {
            setWeight((w) =>
              Number(w) > 400 ? "400" : Number(w) < 0 ? "0" : Number(w).toString()
            );
          }}
        />
      </div>
      <div>
        <div style={{ color: "#22A5BA" }} className="text-center font-bold">
          % of goals completed
        </div>
        <div className="flex">
          {selectedDate !== today ? (
            <input
              type="number"
              placeholder="Enter a number"
              max="100"
              value={goalsPercent}
              className="mr-3"
              onChange={(e) => {
                setGoalPercent(e.target.value);
              }}
              onBlur={() => {
                setGoalPercent((p) =>
                  Number(p) > 100 ? "100" : Number(p) < 0 ? "0" : Number(p).toString()
                );
              }}
            />
          ) : (
            <div style={{ color: "#22A5BA" }}>
              Today's goal completion is calculated for you based on how your checklist is
              going, but you can retrospectively change it for other days.
            </div>
          )}
        </div>
      </div>

      <div className="text-yellow-500 font-bold">Notes</div>
      <div className="flex">
        <textarea
          placeholder="Enter notes..."
          value={notes}
          className="mr-3 resize-none"
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="text-yellow-500 mt-8 mb-1">{submitError}</div>
      <div className="text-pink-800 mb-1">{submitError2}</div>
      <button
        onClick={handleSubmit}
        className="text-white text-lg md:text-2xl p-4 md:p-9 rounded-2xl"
        style={{ backgroundColor: themeColors.blue }}
      >
        Submit
      </button>
    </div>
  );
}
