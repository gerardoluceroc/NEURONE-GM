const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelSchema = new Schema({
    app_code: { type: String, required: true},
    name: { type: String, required: true},
    code: { type: String, required: true, unique: true},
    point_required: { type: Schema.Types.ObjectId, ref: 'Point', required: true},
    description: { type: String, required: true},
    point_threshold: { type: Number, required: true}
});

module.exports = mongoose.model('Level', LevelSchema);
