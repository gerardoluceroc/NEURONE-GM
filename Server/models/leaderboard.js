const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeaderboardSchema = new Schema({
    app_code: { type: String, required: true},
    name: { type: String, required: true},
    parameter: { type: String, required: true},
    element_code: { type: String, required: true},
    code: { type: String, required: true, unique: true}
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);

