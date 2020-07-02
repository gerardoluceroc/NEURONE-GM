const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadgeSchema = new Schema({
    app_name: { type: String, required: true},
    title: { type: String, required: true},
    timesEarned: { type: Number, required: true},
    description: { type: String, required: true},
    lastTimeEarned: { type: Date, required: true}
});

module.exports = mongoose.model('Badge', BadgeSchema);
