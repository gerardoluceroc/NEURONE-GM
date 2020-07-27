const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadgePlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player: { type: Schema.Types.ObjectId, ref: 'Player', required: true},
    badges: [
        {
            badge: {type: Schema.Types.ObjectId, ref: 'Badge', required: true},
            acquisition_date: { type: Date, required: true},
        }
    ]
});

module.exports = mongoose.model('BadgePlayer', BadgePlayerSchema);
