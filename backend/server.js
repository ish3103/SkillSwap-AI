require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {

    res.send("SkillSwap Backend Running");

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

