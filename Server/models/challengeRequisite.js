const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeRequisiteSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    challenge_id: {type: String, required: true},
    challenge_name: {type: String, required: true},
    challenge_required_id: { type: String, required: true},
    challenge_required_name: { type: String, required: true},
    completed: {type: Boolean, required: true},
    active: { type: Boolean, required: true},
});

module.exports = mongoose.model('ChallengeRequisite', ChallengeRequisiteSchema);
