const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeRequisiteSchema = new Schema({
    app_code: { type: String, required: true},
    player: { type: Schema.Types.ObjectId, ref: 'Player'},
    challenge: {type: Schema.Types.ObjectId, ref: 'Challenge'},
    challenge_required: { type: Schema.Types.ObjectId, ref: 'Challenge'},
    completed: {type: Boolean, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
});

module.exports = mongoose.model('ChallengeRequisite', ChallengeRequisiteSchema);
