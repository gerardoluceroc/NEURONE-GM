const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
    code: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    owner: { type: String, required: true},
    focus: { type: Boolean, required: true},
});

module.exports = mongoose.model('Application', ApplicationSchema);

