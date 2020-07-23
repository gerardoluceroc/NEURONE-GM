/** External modules **/
const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

/** Internal modules **/
require('./config/config');
const actionRoutes = require("./api/actionRoutes");
const applicationRoutes = require("./api/applicationRoutes");
const playerRoutes = require("./api/playerRoutes");
const pointRoutes = require("./api/pointRoutes");
const levelRoutes = require("./api/levelRoutes");
const challengeRoutes = require("./api/challengeRoutes");
const badgeRoutes = require("./api/badgeRoutes");
const groupRoutes = require("./api/groupRoutes");
const userRoutes = require("./api/userRoutes");
const actionsPlayerRoutes = require("./api/actionPlayerRoutes");
const pointsPlayerRoutes = require("./api/pointPlayerRoutes");
const levelsPlayerRoutes = require("./api/levelPlayerRoutes");
const badgesPlayerRoutes = require("./api/badgePlayerRoutes");
const actionChallengeRoutes = require("./api/actionChallengeRoutes");

/** Database setup **/
const URI = 'mongodb://localhost:27017/neuronegm';
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(db => console.log('DB is connected '))
    .catch(err => console.error(err));

/** Express setup **/
const app = express();
app.use(cors())

app.use(bodyParser.json());

/** Express routing **/
app.use('/api', actionRoutes);
app.use('/api', applicationRoutes);
app.use('/api', playerRoutes);
app.use('/api', pointRoutes);
app.use('/api', levelRoutes);
app.use('/api', challengeRoutes);
app.use('/api', badgeRoutes);
app.use('/api', groupRoutes);
app.use('/api', userRoutes);
app.use('/api', actionsPlayerRoutes);
app.use('/api', pointsPlayerRoutes);
app.use('/api', levelsPlayerRoutes);
app.use('/api', badgesPlayerRoutes);
app.use('/api', actionChallengeRoutes);

app.get('/', function (req, res) {
    res.send('Hello World!');
});


/** Server deployment **/
app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});

/** Export APP for testing **/
module.exports = app;
