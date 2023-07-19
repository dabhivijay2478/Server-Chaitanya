const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const session = require('express-session');
const router = express.Router();
router.use(session({
    secret: process.env.clientSecret,
    resave: false,
    saveUninitialized: true,
}));

// // Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// // Passport serialization
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Configure the Google Strategy (You can move this to a separate file if needed)
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'https://server-chaitanya.onrender.com/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Use the user information from Google for authentication or registration
    return done(null, profile);
}));

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Route for Google Sign-In
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google Sign-In
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Route for logging out
router.get('/logout', (req, res) => {
    req.logout(); // Remove the unnecessary callback
    res.redirect('/');
});

// Home page
router.get('/', ensureAuthenticated, (req, res) => {
    res.send(`<h1>Hello, ${req.user.displayName}!</h1><a href="/logout">Logout</a>`);
});

// Login page
router.get('/login', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});

router.post("/generate", async (req, res) => {
    try {
        // Get user input from the request body
        const userInput = req.body.userInput;

        // Check if 'userInput' is present in the request body
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
                    // User input message
                    { role: "user", content: userInput },
                    // Add more messages here if you want to continue the conversation
                ],
            },
        });

        const generatedResponse = result[0].candidates[0].content;
        console.log("Generated Response:", generatedResponse);

        res.json({ generatedResponse }); // Send the generated response back in the response JSON
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;