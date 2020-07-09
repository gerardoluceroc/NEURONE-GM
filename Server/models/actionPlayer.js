const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActionPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    action_name: { type: String, required: true},
    action_id: { type: String, required: true},
    date: { type: Date, required: true},
});

module.exports = mongoose.model('ActionPlayer', ActionPlayerSchema);
