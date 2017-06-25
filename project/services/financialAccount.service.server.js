const app = require('../../express');
var financialAccountModel = require('../models/financialAccount/financialAccount.model.server');

app.post('/api/project/user/:userId/financialAccount', isHouseHold, createFinancialAccount);
app.get('/api/project/user/:userId/financialAccount', findAllFinancialAccountsForUser);
app.get('/api/project/financialAccount/:financialAccountId', findFinancialAccountById);
app.put('/api/project/financialAccount/:financialAccountId', isHouseHold, updateFinancialAccount);
app.delete('/api/project/financialAccount/:financialAccountId', isHouseHold, deleteFinancialAccount);
app.get('/api/project/yodlee/callback/:userId',yodleeCallBack);

function yodleeCallBack(req, res) {
    /*
    if(req.query['JSONcallBackStatus']
        && req.query['JSONcallBackStatus'] !== '') {

        var jsonStr = JSON.parse(req.query['JSONcallBackStatus']);

        if(jsonStr.length > 0) {
            var financialAccount = {
                accountName: jsonStr[0].bankName,
                accountNumber: jsonStr[0].providerAccountId,
                yodlee: true,
            };
            financialAccountModel
                .createFinancialAccountForUser(req.params.userId, financialAccount)
                .then(function (financialAccount) {
                    res.json(financialAccount);
                });
        }
    }
    */
    res.redirect('/project/#!/financialAccount');
}

function isHouseHold(req,res,next) {
    if(req.isAuthenticated() && req.user.role === 'HOUSEHOLD')
    {
        next();
    }else
    {
        res.sendStatus(401);
    }
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