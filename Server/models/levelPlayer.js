const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player: {type: Schema.Types.ObjectId, ref: 'Player', required: true},
    level: {type: Schema.Types.ObjectId, ref: 'Level', required: true},
    adquired: {type: Boolean, required: true},
    adquisition_date: {type: Date},
});

module.exports = mongoose.model('LevelPlayer', LevelPlayerSchema);
