const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    point_required_id: { type: String, required: true},
    description: { type: String, required: true},
    point_threshold: { type: Number, required: true}
});

module.exports = mongoose.model('Level', LevelSchema);
