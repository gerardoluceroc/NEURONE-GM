const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActionSchema = new Schema({
   app_name: { type: String, required: true},
   name: { type: String, required: true,  unique: true},
   description: { type: String, required: true},
   repeatable: { type: Boolean, required: true}
});

module.exports = mongoose.model('Action', ActionSchema);

