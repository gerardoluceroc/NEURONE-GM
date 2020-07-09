const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadgePlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    badges: [
        {
            title: { type: String, required: true},
            description: { type: String, required: true},
            acquisition_date: { type: Date, required: true},
        }
    ]
});

module.exports = mongoose.model('BadgePlayer', BadgePlayerSchema);
