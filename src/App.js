import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true); // ปิด/เปิดประวัติ

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/history");
      setHistory(res.data.reverse());
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClick = async (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "DE") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        const result = String(eval(input));
        setInput(result);

        await axios.post("http://localhost:3000/calculate", {
          expression: input,
          result: result
        });

        fetchHistory();
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const handleHistoryClick = (expression) => {
    setInput(expression);
  };

  // ฟังก์ชันลบประวัติ
  const deleteHistory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/history/${id}`);
      fetchHistory();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const buttons = [
    "AC", "DE", ".", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "+",
    "1", "2", "3", "-",
    "00", "0", "="
  ];

  return (
    <div className="calculator">

      {/* Display */}
      <div className="display">{input || "0"}</div>

      {/* Buttons */}
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={btn === "=" ? "equal" : ""}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* ปุ่มเปิด/ปิดประวัติ */}
      <button
        className="toggle-history"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "ซ่อนประวัติ" : "แสดงประวัติ"}
      </button>

      {/* History Box */}
      {showHistory && (
        <div className="history">
          <h3>History</h3>
          {history.length === 0 && <p>No calculations yet.</p>}

          {history.map((h) => (
            <div key={h.id} className="history-item">
              <div onClick={() => handleHistoryClick(h.expression)}>
                <span className="expression">{h.expression}</span>
                <span className="result">= {h.result}</span>
              </div>

              {/* ปุ่มลบ */}
              <button
                className="delete-btn"
                onClick={() => deleteHistory(h.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;