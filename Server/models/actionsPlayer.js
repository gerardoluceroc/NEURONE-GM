const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActionsPlayerSchema = new Schema({
    app_name: { type: String, required: true},
    player_id: { type: String, required: true},
    actions: [
        {
            name: { type: String, required: true,  unique: true},
            description: { type: String, required: true},
            date: { type: Date, required: true},
            quantity: { type: Number, required: true},
        }
    ]
});

module.exports = mongoose.model('ActionsPlayer', ActionsPlayerSchema);
