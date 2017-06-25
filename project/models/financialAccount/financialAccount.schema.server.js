var mongoose = require('mongoose');

var financialAccountSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    accountName: String,
    accountNumber: String,
    yodlee: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'OFM_financialAccount'});

module.exports = financialAccountSchema;
