const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengesPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    challenge_id: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    finished: { type: Boolean, required: true},
    actionsRequired: [
        {
            name: { type: String, required: true},
            description: { type: String, required: true},
            timesRequired: { type: Number, required: true},
            action_id: { type: String, required: true},
            timesCompleted: { type: Number, required: true},
            finished: { type: Boolean, required: true}
        }
    ],
    challengesRequired: [
        {
            challenge_id: { type: String, required: true},
            name: { type: String, required: true},
            description: { type: String, required: true},
            finished: { type: Boolean, required: true}
        }
    ],
    rewards: [
        {
            title: { type: String, required: true},
            badge_id: { type: String, required: true},
            description: { type: String, required: true},
        }
    ],

});

module.exports = mongoose.model('ChallengesPlayer', ChallengesPlayerSchema);
