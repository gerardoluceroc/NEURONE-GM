const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserTokenSchema = new Schema({
    username: {type: String, required: true, unique: true},
    token: {type: String, required: true},
    timestamp: {type: Date, required: true},
    expiration: {type: Number, required: true}
});

module.exports = mongoose.model('UserToken', UserTokenSchema);