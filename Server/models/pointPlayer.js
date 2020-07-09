const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    points: [
        {
            name: { type: String, required: true},
            abbreviation: { type: String, required: true},
            quantity: { type: Number, required: true},
            daily_max: { type: Number, required: true},
            last_time_earned: { type: Date, required: true},
            max_points: { type: Number, required: true},
        }
    ]
});

module.exports = mongoose.model('PointPlayer', PointPlayerSchema);
