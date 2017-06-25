var mongoose = require('mongoose');
var transactionSchema = require('./transaction.schema.server');
var transactionModel = mongoose.model('OFM_TransactionModel', transactionSchema);
var userModel = require('../user/user.model.server');
var financeAccountModel = require('../financialAccount/financialAccount.model.server');

transactionModel.createTransactionForUser = createTransactionForUser;
transactionModel.findTransactionById = findTransactionById;
transactionModel.findAllTransactionsForUser = findAllTransactionsForUser;
transactionModel.findAllTransactionsForAccount = findAllTransactionsForAccount;
transactionModel.queryTransactionsForAccount = queryTransactionsForAccount;
transactionModel.findAllTransactions = findAllTransactions;
transactionModel.updateTransaction = updateTransaction;
transactionModel.deleteTransactionFromUser = deleteTransactionFromUser;

module.exports = transactionModel;

function createTransactionForUser(userId, transaction) {
    transaction._user = userId;
    return transactionModel
        .create(transaction);
}

function findTransactionById(transactionId) {
    return transactionModel
        .findById(transactionId);
}

function findAllTransactionsForUser(userId) {
    return transactionModel
        .find({_user: userId})
        .sort( { dateCreated: -1 })
        .populate('_user')
        .exec();
}

function findAllTransactionsForAccount(accountId) {
    return transactionModel
        .find({_account: accountId})
        .sort( { dateCreated: -1 })
        .populate('_account')
        .exec();
}

function queryTransactionsForAccount(accountId, category, dateFrom, dateTo) {

    var query = [];
    query.push({ _account: accountId });

    if(category && category !== 'All') {
        category = category.toString().replace(new RegExp('-', 'g'), '/');
        query.push({ category: category });
    }

    if(dateFrom && dateFrom != 'NA') {
        query.push({ dateCreated: {"$gte" : dateFrom}});
    }

    if(dateTo && dateTo != 'NA') {
        query.push({ dateCreated: {"$lte" : dateTo}});
    }
    return transactionModel
        .find({ $and: query})
        .sort( { dateCreated: -1 })
        .populate('_account')
        .exec();
}


function findAllTransactions() {
    return transactionModel.find();
}

function updateTransaction(transactionId, transaction) {
    return transactionModel
        .update({_id: transactionId}, {$set: transaction});
}

function deleteTransactionFromUser(transactionId) {
    return transactionModel
        .remove({_id: transactionId});
}