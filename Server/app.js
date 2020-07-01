/** External modules **/
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/** Internal modules **/
require('./config/config');
const documentRoutes = require("./api/documentRoutes");

/** Database setup **/
const URI = 'mongodb://localhost:3001/meteor';
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('DB is connected '))
    .catch(err => console.error(err));

/** Express setup **/
const app = express();


app.use(bodyParser.json());

/** Express routing **/
app.use('/api', documentRoutes);

app.get('/', function (req, res) {
    res.send('Hello World!');
});


/** Server deployment **/
app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});

/** Export APP for testing **/
module.exports = app;
