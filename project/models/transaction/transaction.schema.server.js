var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    _account: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_FinancialAccountModel"},
    type: {type: String, enum: ['CREDIT', 'DEBIT'], default: 'CREDIT'},
    amount: Number,
    description: String,
    category: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'OFM_transaction'});

module.exports = transactionSchema;
