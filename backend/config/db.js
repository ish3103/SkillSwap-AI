const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "skillswap"
});

db.connect((err) => {

    if(err){

        console.log("MySQL Connection Failed");
        console.log(err);
        return;

    }

    console.log("MySQL Connected");

});

module.exports = db;