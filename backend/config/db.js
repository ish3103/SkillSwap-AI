const mongoose = require("mongoose");

const connectDB = async () => {

    try{

        await mongoose.connect(
            "mongodb+srv://ish101204_db_user:admin1234@skillswapdb.tolioiy.mongodb.net/?appName=SkillSwapDB"
        );

        console.log("MongoDB Connected");

    }
    catch(error){

        console.log(error);

    }

};

module.exports = connectDB;