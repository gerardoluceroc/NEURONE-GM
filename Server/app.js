/** External modules **/
const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('config'); //we load the db location from the JSON files
const morgan = require('morgan');

/** Internal modules **/
require('./config/config');
const actionRoutes = require("./api/actionRoutes");
const applicationRoutes = require("./api/applicationRoutes");
const playerRoutes = require("./api/playerRoutes");
const pointRoutes = require("./api/pointRoutes");
const leaderboardRoutes = require("./api/leaderboardRoutes");
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
const webhooksRoutes = require("./api/webhookRoutes");
const imageRoutes = require("./api/imageRoutes");
const userToken = require('./models/userToken');


//db connection
mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


/** Express setup **/
const app = express();
app.use(cors())

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

/** Express routing **/
app.use('/api', actionRoutes);
app.use('/api', applicationRoutes);
app.use('/api', playerRoutes);
app.use('/api', pointRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', levelRoutes);
app.use('/api', challengeRoutes);
app.use('/api', badgeRoutes);
app.use('/api', groupRoutes);
app.use('/auth', userRoutes);
app.use('/api', actionsPlayerRoutes);
app.use('/api', pointsPlayerRoutes);
app.use('/api', levelsPlayerRoutes);
app.use('/api', badgesPlayerRoutes);
app.use('/api', actionChallengeRoutes);
app.use('/api', imageRoutes);
app.use('/api', webhooksRoutes);

app.get('/', function (req, res) {
    res.send('Hello World!');
});


/** Server deployment **/
app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});

/** Export APP for testing **/
module.exports = app;
