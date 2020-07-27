const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
    app_name: { type: String, required: true},
    name: { type: String, required: true},
    code: { type: String, required: true, unique: true},
});

module.exports = mongoose.model('Group', GroupSchema);
