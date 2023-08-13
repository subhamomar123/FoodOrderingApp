const express = require('express');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const cors = require('cors'); // Add this line to import the cors middleware
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');
mongoDB();

// Use the cors middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(express.json());
app.use('/api', require('./Routes/Auth'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
