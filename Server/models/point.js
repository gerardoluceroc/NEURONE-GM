const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    abbreviation: { type: String, required: true},
    initial_points: { type: Number, required: true},
    max_points: { type: Number, required: true},
    daily_max: { type: Number, required: true},
    is_default: { type: Boolean, required: true},
    hidden: { type: Boolean, required: true},
});

module.exports = mongoose.model('Point', PointSchema);
