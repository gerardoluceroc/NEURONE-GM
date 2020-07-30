const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActionSchema = new Schema({
   app_code: { type: String, required: true},
   name: { type: String, required: true},
   description: { type: String, required: true},
   repeatable: { type: Boolean, required: true},
   code: { type: String, required: true, unique: true}
});

module.exports = mongoose.model('Action', ActionSchema);
