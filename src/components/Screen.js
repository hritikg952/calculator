import React from "react";

export default function Screen({ equation, display }) {
  return (
    <>
      <div>
        <p>{equation}</p>
      </div>
      <div>
        <p>{display}</p>
      </div>
    </>
  );
}
