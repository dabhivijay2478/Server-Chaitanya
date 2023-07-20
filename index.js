const express = require('express');

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/', require('./Router/routes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
