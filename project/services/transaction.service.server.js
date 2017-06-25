const app = require('../../express');
var transactionModel = require('../models/transaction/transaction.model.server');

app.post('/api/project/user/:userId/transaction', createTransaction);
app.get('/api/project/user/:userId/transaction', findAllTransactionsForUser);
app.get('/api/project/account/:accountId/transaction', findAllTransactionsForAccount);
app.get('/api/project/account/:accountId/queryTransaction/:category/:dateFrom/:dateTo', queryTransactionsForAccount);
app.get('/api/project/transaction/:transactionId', findTransactionById);
app.put('/api/project/transaction/:transactionId', updateTransaction);
app.delete('/api/project/transaction/:transactionId', deleteTransaction);

function createTransaction(req, res) {
    var transaction = req.body;
    var userId = req.params.userId;
    transactionModel
        .createTransactionForUser(userId, transaction)
        .then(function (transaction) {
            res.json(transaction);
        });
}

function findAllTransactionsForUser(req, res) {
    transactionModel
        .findAllTransactionsForUser(req.params.userId)
        .then(function (transactions) {
            res.json(transactions);
        })
}

function findAllTransactionsForAccount(req, res) {
    transactionModel
        .findAllTransactionsForAccount(req.params.accountId)
        .then(function (transactions) {
            res.json(transactions);
        })
}


function queryTransactionsForAccount(req, res) {
    transactionModel
        .queryTransactionsForAccount(req.params.accountId,req.params.category,req.params.dateFrom,req.params.dateTo)
        .then(function (transactions) {
            res.json(transactions);
        })
}

function findTransactionById(req, res) {
    var transactionId = req.params['transactionId'];
    transactionModel
        .findTransactionById(transactionId)
        .then(function (transaction) {
            res.json(transaction);
        });
}

function updateTransaction(req, res) {
    var transaction = req.body;
    transactionModel
        .updateTransaction(req.params.transactionId, transaction)
        .then(function (status) {
            res.send(status);
        });
}

function deleteTransaction(req, res) {
    var transactionId = req.params.transactionId;
    transactionModel
        .deleteTransactionFromUser(transactionId)
        .then(function (status) {
            res.json(status);
        });
}