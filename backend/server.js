require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {

    res.send("SkillSwap Backend Running");

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});

