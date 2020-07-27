const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    point: {type: Schema.Types.ObjectId, ref: 'Point', required: true}
});

module.exports = mongoose.model('PointPlayer', PointPlayerSchema);
