const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeRequisiteSchema = new Schema({
    app_name: { type: String, required: true},
    player: { type: Schema.Types.ObjectId, ref: 'Player'},
    challenge: {type: Schema.Types.ObjectId, ref: 'Challenge'},
    challenge_required: { type: Schema.Types.ObjectId, ref: 'Challenge'},
    completed: {type: Boolean, required: true},
    active: { type: Boolean, required: true},
});

module.exports = mongoose.model('ChallengeRequisite', ChallengeRequisiteSchema);
