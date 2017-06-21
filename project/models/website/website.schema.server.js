var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "OFM_PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'OFM_website'});

module.exports = websiteSchema;
