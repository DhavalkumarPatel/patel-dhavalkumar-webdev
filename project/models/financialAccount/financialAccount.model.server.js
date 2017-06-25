var mongoose = require('mongoose');
var financialAccountSchema = require('./financialAccount.schema.server');
var financialAccountModel = mongoose.model('OFM_FinancialAccountModel', financialAccountSchema);
var userModel = require('../user/user.model.server');

financialAccountModel.createFinancialAccountForUser = createFinancialAccountForUser;
financialAccountModel.findFinancialAccountById = findFinancialAccountById;
financialAccountModel.findAllFinancialAccountsForUser = findAllFinancialAccountsForUser;
financialAccountModel.findAllFinancialAccounts = findAllFinancialAccounts;
financialAccountModel.updateFinancialAccount = updateFinancialAccount;
financialAccountModel.deleteFinancialAccountFromUser = deleteFinancialAccountFromUser;

module.exports = financialAccountModel;

function createFinancialAccountForUser(userId, financialAccount) {
    financialAccount._user = userId;
    return financialAccountModel
        .create(financialAccount);
}

function findFinancialAccountById(financialAccountId) {
    return financialAccountModel
        .findById(financialAccountId);
}

function findAllFinancialAccountsForUser(userId) {
    return financialAccountModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findAllFinancialAccounts() {
    return financialAccountModel
        .find()
        .populate('_user')
        .exec();
}

function updateFinancialAccount(financialAccountId, financialAccount) {
    return financialAccountModel
        .update({_id: financialAccountId}, {$set: financialAccount});
}

function deleteFinancialAccountFromUser(financialAccountId) {
    return financialAccountModel
        .remove({_id: financialAccountId});
}