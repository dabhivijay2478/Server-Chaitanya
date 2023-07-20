const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use('/', require('./Router/routes'));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
