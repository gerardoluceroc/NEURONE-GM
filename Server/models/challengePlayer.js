const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengePlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    challenge_id: {type: String, required: true},
    challenge_name: {type: String, required: true},
    completed: {type: Boolean, required: true},
    active: { type: Boolean, required: true},
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    badge_id: { type: String, required: false},
});

module.exports = mongoose.model('ChallengePlayer', ChallengePlayerSchema);
