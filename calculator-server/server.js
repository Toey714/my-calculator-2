require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connect Error:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
});

// Save calculation
app.post("/calculate", (req, res) => {
    const { expression, result } = req.body;
    const sql = "INSERT INTO history (expression, result) VALUES (?, ?)";
    db.query(sql, [expression, result], (err, data) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ status: "saved" });
    });
});

// Get history
app.get("/history", (req, res) => {
    db.query("SELECT * FROM history ORDER BY id DESC", (err, data) => {
        if (err) return res.status(500).json({ error: err });
        res.json(data);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
