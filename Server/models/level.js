const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    pointRequired_id: { type: String, required: true},
    description: { type: String, required: true},
    pointThreshold: { type: Number, required: true}
});

module.exports = mongoose.model('Level', LevelSchema);
