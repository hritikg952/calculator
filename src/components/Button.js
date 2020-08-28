import React from "react";
import "../css/button.css";

export default function Button({ classname, value, click }) {
  return (
    <button className={`button ${classname}`} value={value} onClick={click}>
      {value}
    </button>
  );
}
