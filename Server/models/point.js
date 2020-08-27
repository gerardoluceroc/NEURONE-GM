const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
    app_code: { type: String, required: true},
    name: { type: String, required: true},
    code: { type: String, required: true, unique: true},
    abbreviation: { type: String, required: true},
    initial_points: { type: Number, required: true},
    max_points: { type: Number, required: true},
    daily_max: { type: Number, required: true},
    is_default: { type: Boolean, required: true},
    hidden: { type: Boolean, required: true},
    image_url: { type: String},
    image_id: { type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('Point', PointSchema);
