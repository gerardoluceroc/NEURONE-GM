const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointsPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    points: [
        {
            name: { type: String, required: true},
            abbreviation: { type: String, required: true},
            quantity: { type: Number, required: true},
            dailyMax: { type: Number, required: true},
            lastTimeEarned: { type: Date, required: true},
            maxPoints: { type: Number, required: true},
        }
    ]
});

module.exports = mongoose.model('PointsPlayer', PointsPlayerSchema);
