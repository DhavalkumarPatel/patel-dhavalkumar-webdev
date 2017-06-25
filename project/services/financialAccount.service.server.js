const app = require('../../express');
var financialAccountModel = require('../models/financialAccount/financialAccount.model.server');

app.get('/api/project/financialAccounts',isAdmin,findAllFinancialAccounts);
app.post('/api/project/user/:userId/financialAccount', isHouseHoldOrAdmin, createFinancialAccount);
app.get('/api/project/user/:userId/financialAccount', findAllFinancialAccountsForUser);
app.get('/api/project/financialAccount/:financialAccountId', findFinancialAccountById);
app.put('/api/project/financialAccount/:financialAccountId', isHouseHoldOrAdmin, updateFinancialAccount);
app.delete('/api/project/financialAccount/:financialAccountId', isHouseHoldOrAdmin, deleteFinancialAccount);

function findAllFinancialAccounts(req, res) {
    financialAccountModel
        .findAllFinancialAccounts()
        .then(function (accounts) {
            res.json(accounts);
        });
}

function createFinancialAccount(req, res) {
    var financialAccount = req.body;
    var userId = req.params.userId;
    financialAccountModel
        .createFinancialAccountForUser(userId, financialAccount)
        .then(function (financialAccount) {
            res.json(financialAccount);
        });
}

function findAllFinancialAccountsForUser(req, res) {
    financialAccountModel
        .findAllFinancialAccountsForUser(req.params.userId)
        .then(function (financialAccounts) {
            res.json(financialAccounts);
        })
}

function findFinancialAccountById(req, res) {
    var financialAccountId = req.params['financialAccountId'];
    financialAccountModel
        .findFinancialAccountById(financialAccountId)
        .then(function (financialAccount) {
            res.json(financialAccount);
        });
}

function updateFinancialAccount(req, res) {
    var financialAccount = req.body;
    financialAccountModel
        .updateFinancialAccount(req.params.financialAccountId, financialAccount)
        .then(function (status) {
            res.send(status);
        });
}

function deleteFinancialAccount(req, res) {
    var financialAccountId = req.params.financialAccountId;
    financialAccountModel
        .deleteFinancialAccountFromUser(financialAccountId)
        .then(function (status) {
            res.json(status);
        });
}

function isHouseHoldOrAdmin(req,res,next) {
    if(req.isAuthenticated() && (req.user.role === 'HOUSEHOLD' || req.user.role === 'ADMIN'))
    {
        next();
    }else
    {
        res.sendStatus(401);
    }
}

function isAdmin(req,res,next) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN')
    {
        next();
    }else
    {
        res.sendStatus(401);
    }
}