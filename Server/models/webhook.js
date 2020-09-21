const mongoose = require('mongoose');
const { Schema } = mongoose;

const WebhookSchema = new Schema({
    app_code: { type: String, required: true},
    givePointsUrl: { type: String},
    challengeCompletedUrl: { type: String},
    levelUpUrl: { type: String},
    badgeAcquiredUrl: { type: String}
});

module.exports = mongoose.model('Webhook', WebhookSchema);