const express = require('express');
const connection = require('./config/mongoDB');
const app = express();
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start
app.listen(3030, () => {
    console.log("Server is running ");
});
