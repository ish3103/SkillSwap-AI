const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* CREATE REQUEST */

router.post("/", (req, res) => {

    const { sender_name, receiver_name } = req.body;

    db.query(
        "INSERT INTO requests(sender_name, receiver_name) VALUES(?,?)",
        [sender_name, receiver_name],
        (err) => {

            if(err){

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(201).json({
                message: "Request sent successfully"
            });

        }
    );

});

/* GET ALL REQUESTS */

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM requests",
        (err, results) => {

            if(err){

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json(results);

        }
    );

});

module.exports = router;