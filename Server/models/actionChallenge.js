const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActionChallengeSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    challenge_id: {type: String, required: true},
    challenge_name: {type: String, required: true},
    action_id: { type: String, required: true},
    action_name: { type: String, required: true},
    action_counter: { type: Number, required: true},
    total_actions_required: { type: Number, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    completed: {type: Boolean, required: true},
    active: { type: Boolean, required: true},
});

module.exports = mongoose.model('ActionChallenge', ActionChallengeSchema);
