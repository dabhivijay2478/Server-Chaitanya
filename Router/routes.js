const express = require('express');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const router = express.Router();
const GOOGLE_CLIENT_ID = process.env.clientID;


router.get('/api/google-client-id', (req, res) => {
    res.json({ clientId: GOOGLE_CLIENT_ID });
});

router.post("/generate", async (req, res) => {
    try {
      
        const userInput = req.body.userInput;

      
        if (!userInput) {
            return res.status(400).json({ error: "Missing 'userInput' in the request body." });
        }

        const MODEL_NAME = "models/chat-bison-001";
        const API_KEY = process.env.API_KEY;

        const client = new DiscussServiceClient({
            authClient: new GoogleAuth().fromAPIKey(API_KEY),
        });

        const result = await client.generateMessage({
            model: MODEL_NAME,
            temperature: 0.5,
            candidateCount: 1,
            prompt: {
                context: "Hi, I am Chaitanya .",
                messages: [
                  
                    { role: "user", content: userInput },
                 
                ],
            },
        });

        const generatedResponse = result[0].candidates[0].content;
        console.log("Generated Response:", generatedResponse);

        res.json({ generatedResponse }); 
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;