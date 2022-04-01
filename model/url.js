const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
    original_url:{
        type: String
    },
    short_url:{
        type: String
    }
})
module.exports = mongoose.model('Url', UrlSchema);
