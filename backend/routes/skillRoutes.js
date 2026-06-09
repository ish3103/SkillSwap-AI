const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM skills",
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
router.post("/", (req, res) => {

    const {
        name,
        offering_skill,
        wanted_skill
    } = req.body;

    db.query(
        "INSERT INTO skills(name, offering_skill, wanted_skill) VALUES(?,?,?)",
        [name, offering_skill, wanted_skill],
        (err) => {

            if(err){

                return res.status(500).json({
                    message: err.message
                });

            }

            res.status(201).json({
                message: "Skills saved successfully"
            });

        }
    );

});

module.exports = router;