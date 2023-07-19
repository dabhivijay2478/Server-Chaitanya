// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
// const app = express();

// // Configure the session
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport serialization
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// // Configure the Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.clientID,
//     clientSecret: process.env.clientSecret,
//     callbackURL: 'http://localhost:3000/auth/google/callback',
// }, (accessToken, refreshToken, profile, done) => {
//     // Use the user information from Google for authentication or registration
//     return done(null, profile);
// }));

// // Middleware to check if the user is authenticated
// const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

// // Route for Google Sign-In
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Callback route after Google Sign-In
// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         res.redirect('/');
//     }
// );

// // Route for logging out
// // Route for logging out
// app.get('/logout', (req, res) => {
//     req.logout(() => { });
//     res.redirect('/');
// });


// // Home page
// app.get('/', ensureAuthenticated, (req, res) => {
//     res.send(`<h1>Hello, ${req.user.displayName}!</h1><a href="/logout">Logout</a>`);
// });

// // Login page
// app.get('/login', (req, res) => {
//     res.send('<a href="/auth/google">Login with Google</a>');
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
