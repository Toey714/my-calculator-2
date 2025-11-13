import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "/", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "C", type: "control" },
    { label: "+", type: "operator" },
    { label: "=", type: "control" },
  ];

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{input || "0"}</div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              className={btn.type}
              onClick={() => {
                if (btn.label === "C") handleClear();
                else if (btn.label === "=") handleCalculate();
                else handleClick(btn.label);
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
