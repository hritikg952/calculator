import React, { useState } from "react";
import { CSVLink} from "react-csv";
import "./css/App.css";

import Screen from "../src/components/Screen.js";
import Button from "../src/components/Button.js";

export default function App() {

  //? STATES
  const [display, setDisplay] = useState("");
  const [equation, setEquation] = useState("");
  const [data, setData] = useState([]);

  const buttonValue = [
    { label: "AC", cName: "clear" },
    { label: "/", cName: "divide" },
    { label: "*", cName: "multiply" },
    { label: "7", cName: "seven" },
    { label: "8", cName: "eigth" },
    { label: "9", cName: "nine" },
    { label: "-", cName: "minus" },
    { label: "4", cName: "four" },
    { label: "5", cName: "five" },
    { label: "6", cName: "six" },
    { label: "+", cName: "plus" },
    { label: "1", cName: "one" },
    { label: "2", cName: "two" },
    { label: "3", cName: "three" },
    { label: "CE", cName: "backspace" },
    { label: "0", cName: "zero" },
    { label: ".", cName: "dot" },
    { label: "=", cName: "equal" },
  ];
  //? HEADER FOR CSV FILE
  const header = [
    { label: "Equation", key: "equation" },
    { label: "Answer", key: "answer" },
  ];

  //? NUMBER AND OPERATOR INPUT
  const numInput = (e) => {
    if (equation) {
    }
    setEquation(equation + e.currentTarget.value);
    if (e.currentTarget.value === ".") {
      if (display === "") {
        console.log("true");
        setDisplay(`0${e.currentTarget.value}`);
      }
    }
    if (
      e.currentTarget.value.match(/[+\-*\/]$/) == null &&
      !e.currentTarget.value.includes("=")
    ) {
      setDisplay(e.currentTarget.value);
    }
  };
  
  //? CALCULATE
  const calculate = () => {
    try {
      setDisplay("")
      setEquation(eval(equation));
      setData((prevVal) => [
        ...prevVal,
        { equation: `'${equation}`, answer: eval(equation) },
      ]);
    } catch {
      setDisplay("");
      setEquation("Invalid Expression");
    }
  };

  //? CLEAR SCREEN
  const clearScreen = () => {
    setDisplay("");
    setEquation("");
  };

  //? BACKSPACE
  const backspace = () => {
    setDisplay("");
    try {
      setEquation(equation.slice(0, -1));
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="container">
      <div className="screen-div">
        <Screen equation={equation} display={display} />
      </div>

      <div className="button-div">
        {buttonValue.map((e, index) => {
          if (e.label === "=") {
            return (
              <Button
                classname={e.cName}
                value={e.label}
                click={calculate}
                key={index}
              />
            );
          } else if (e.label === "AC") {
            return (
              <Button
                classname={e.cName}
                value={e.label}
                click={clearScreen}
                key={index}
              />
            );
          } else if (e.label === "CE") {
            return (
              <Button
                classname={e.cName}
                value={e.label}
                click={backspace}
                key={index}
              />
            );
          } else {
            return (
              <Button
                classname={e.cName}
                value={e.label}
                click={numInput}
                key={index}
              />
            );
          }
        })}
      </div>
      <CSVLink data={data} headers={header} className="download-button">
        {/* <button className="download-button">Download</button> */}
        download
      </CSVLink>
    </div>
  );
}
