const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    levels: [
        {
            name: { type: String, required: true},
            description: { type: String, required: true},
            acquisition_date: { type: Date, required: true},
            point_required_id: { type: String, required: true},
            point_threshold: { type: Number, required: true},
            points_earned: { type: Number, required: true},
            completed: { type: Boolean, required: true}
        }
    ]
});

module.exports = mongoose.model('LevelPlayer', LevelPlayerSchema);
