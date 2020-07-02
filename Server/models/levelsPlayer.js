const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelsPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    levels: [
        {
            name: { type: String, required: true},
            description: { type: String, required: true},
            acquisitionDate: { type: Date, required: true},
            pointRequired_id: { type: String, required: true},
            pointThreshold: { type: Number, required: true},
            pointsEarned: { type: Number, required: true},
            completed: { type: Boolean, required: true}
        }
    ]
});

module.exports = mongoose.model('LevelsPlayer', LevelsPlayerSchema);
