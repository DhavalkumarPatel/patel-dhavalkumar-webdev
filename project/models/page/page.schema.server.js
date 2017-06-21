var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "OFM_WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'OFM_page'});

module.exports = pageSchema;