const express = require('express');
const connection = require('./config/mongoDB');
const Auth = require('./routes/Auth.js');
const app = express();
const cors = require('cors');
const Event = require('./routes/Event.js');
const User = require('./routes/User.js');
const Admin = require('./routes/Admin.js');


connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/admin',Admin);
app.use('/auth',Auth);
app.use('/event',Event);
app.use('/user',User);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start
app.listen(3030, () => {
    console.log("Server is running ");
});
