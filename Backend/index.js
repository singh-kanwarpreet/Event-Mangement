const express = require('express');
const connection = require('./config/mongoDB');
const Auth = require('./routes/Auth.js');
const app = express();
const cors = require('cors');
const Event = require('./routes/Event.js');

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth',Auth);
app.use('/event',Event);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start
app.listen(3030, () => {
    console.log("Server is running ");
});
