const express = require("express");

const router = express.Router();

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/chat", async (req, res) => {

    try{

        const { message } = req.body;

        const completion =
            await openai.chat.completions.create({

                model: "gpt-4.1-mini",

                messages: [

                    {
                        role: "system",
                        content:
                        "You are SkillBot, an AI assistant for a student skill exchange platform."
                    },

                    {
                        role: "user",
                        content: message
                    }

                ]

            });

        res.json({

            reply:
            completion.choices[0].message.content

        });

    }
  catch(error){

    console.log(error);

    const msg =
        req.body.message.toLowerCase();

    let fallback =
        "I'm currently in offline mode 🤖";

    if(msg.includes("java")){

        fallback =
            "Java is excellent for placements and backend development ☕";
    }

    else if(msg.includes("ai")){

        fallback =
            "AI Engineering and Full Stack are trending careers 🚀";
    }

    else if(msg.includes("placement")){

        fallback =
            "Focus on DSA, projects, and communication skills.";
    }

    else if(msg.includes("web")){

        fallback =
            "Web Development is one of the best beginner-friendly tech skills 💻";
    }

    res.json({
        reply: fallback
    });

}

});

module.exports = router;

