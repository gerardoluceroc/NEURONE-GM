const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
    app_code: { type: String, required: true},
    code: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    assign_to: { type: String, required: true},
    actions_required: [
        {
            _id: false,
            action: {type: Schema.Types.ObjectId, ref: 'Action', required: true},
            times_required: { type: Number, required: true},
        }
    ],
    challenges_required: [
        {
            challenge: {type: Schema.Types.ObjectId, ref: 'Challenge', required: true}
        }
    ],
    badge: { type: Schema.Types.ObjectId, ref: 'Badge'},
    points_awards: [
        {
            point: {type: Schema.Types.ObjectId, ref: 'Point', required: true},
            amount: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
