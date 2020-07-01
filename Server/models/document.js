const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentSchema = new Schema({
   _id: { type: String, required: true},
    docName: { type: String, required: true},
    title: { type: String, required: true},
    locale: { type: String, required: true},
    relevant: { type: Boolean, required: true},
    domain: { type: [String], required: true},
    keywords: { type: [String], required: true},
    date: { type: String, required: true},
    url: { type: String, required: true},
    searchSnippet: { type: String, required: true},
    indexedBody: { type: String, required: true},
    route: {type: String, required: true},
    hash: { type: String, required: true}
});

module.exports = mongoose.model('documents', DocumentSchema);
