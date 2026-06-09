require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root123",
    database: process.env.DB_NAME || "skillswap"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = db;