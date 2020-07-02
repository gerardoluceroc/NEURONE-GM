const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    actionsRequired: [
        {
            name: { type: String, required: true},
            description: { type: String, required: true},
            timesRequired: { type: Number, required: true},
            action_id: { type: String, required: true}
        }
    ],
    challengesRequired: [
        {
            challenge_id: { type: String, required: true},
            name: { type: String, required: true},
            description: { type: String, required: true},
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

module.exports = mongoose.model('Challenge', ChallengeSchema);
