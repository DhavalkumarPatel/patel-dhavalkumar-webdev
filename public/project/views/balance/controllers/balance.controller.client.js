(function () {
    angular
        .module('OFM')
        .controller('balanceController', balanceController);
    
    function balanceController($routeParams,
                               currentUser,
                               $location,
                               financialAccountService,
                               transactionService,
                               userService,
                               yodleeService) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.parentId = currentUser._id;
        model.logout = logout;

        function init() {

            if(currentUser.role === 'FAMILY-MEMBER') {
                model.parentId = currentUser._houseHoldUser;
            }
            financialAccountService
                .findAllFinancialAccountsForUser(model.parentId)
                .then(renderFinancialAccounts);

            yodleeService
                .getCOBSession()
                .then(loadYodleeSession)
        }
        init();

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
            var map = new Object();

            for(var i in financialAccounts) {
                map[financialAccounts[i]._id.toString()] = 0;
            }

            transactionService
                .findAllTransactionsForUser(model.parentId)
                .then(function (transactions) {
                    for (var j in transactions) {
                        if (transactions[j].type === 'CREDIT') {
                            map[transactions[j]._account] += transactions[j].amount;
                        } else {
                            map[transactions[j]._account] -= transactions[j].amount;
                        }
                    }
                });

            model.map = map;
        }

        function loadYodleeSession(data) {

            model.cobSession = data.session.cobSession;

            yodleeService
                .getUserSession(model.cobSession)
                .then(function (data) {
                    model.userSession = data.user.session.userSession;

                    yodleeService
                        .getAccounts(model.cobSession, model.userSession)
                        .then(function (data) {
                            model.yodleeAccounts = data.account;
                        })
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();