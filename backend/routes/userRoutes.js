const bcrypt = require("bcryptjs");
const express = require("express");

const router = express.Router();

const db = require("../config/db");

/* SIGNUP */

router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                if (result.length > 0) {

                    return res.status(400).json({
                        message: "User already exists"
                    });

                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    (err) => {

                        if (err) {

                            return res.status(500).json({
                                message: err.message
                            });

                        }

                        res.status(201).json({
                            message: "User registered successfully"
                        });

                    }
                );

            }
        );

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* LOGIN */

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(400).json({
                    message: "User not found"
                });

            }

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(400).json({
                    message: "Invalid password"
                });

            }

            res.status(200).json({
                message: "Login successful",
                user
            });

        }
    );

});

module.exports = router;