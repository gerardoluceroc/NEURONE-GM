const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    identifier: { type: String, required: true, unique: true},
});

module.exports = mongoose.model('Player', PlayerSchema);
