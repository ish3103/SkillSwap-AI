require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");
const skillRoutes = require("./routes/skillRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {

    res.send("SkillSwap Backend Running");

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});





