const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadgesPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    badges: [
        {
            title: { type: String, required: true},
            description: { type: String, required: true},
            acquisitionDate: { type: Date, required: true},
        }
    ]
});

module.exports = mongoose.model('BadgesPlayer', BadgesPlayerSchema);
