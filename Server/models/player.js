const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    app_code: { type: String, required: true},
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    code: { type: String, required: true, unique: true},
    sourceId: { type: String},
    image_url: { type: String},
    image_id: { type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('Player', PlayerSchema);
