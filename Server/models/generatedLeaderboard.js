const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeneratedLeaderboardSchema = new Schema({
    app_code: { type: String, required: true},
    leaderboard: { type: Schema.Types.ObjectId, ref: 'Leaderboard', required: true},
    leaderboard_code: { type: String, required: true},
    last_update: { type: Date, required: true},
    table: [
        {
            _id: false,
            name:  {type: String},
            last_name: { type: String},
            amount: { type: Number},
            rank: { type: Number}
        }
    ]
});

module.exports = mongoose.model('GeneratedLeaderboard', GeneratedLeaderboardSchema);