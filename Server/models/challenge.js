const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    assign_to: { type: String, required: true},
    actions_required: [
        {
            name: { type: String, required: true},
            description: { type: String, required: true},
            times_required: { type: Number, required: true},
            action_id: { type: String, required: true}
        }
    ],
    challenges_required: [
        {
            challenge_id: { type: String, required: true},
            name: { type: String, required: true},
            description: { type: String, required: true},
        }
    ],
    badge_id: { type: String, required: false},

});

module.exports = mongoose.model('Challenge', ChallengeSchema);
