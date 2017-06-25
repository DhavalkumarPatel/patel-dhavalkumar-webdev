(function () {
    angular
        .module('OFM')
        .controller('financialAccountListController', financialAccountListController);
    
    function financialAccountListController($routeParams,
                                            currentUser,
                                            $location,
                                            financialAccountService,
                                            userService,
                                            yodleeService) {
        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.parentId = currentUser._id;
        model.logout = logout;
        model.deleteYodleeAccount = deleteYodleeAccount;

        function init() {

            if(currentUser.role === 'FAMILY-MEMBER') {
                model.parentId = currentUser._houseHoldUser;
            }
            financialAccountService
                .findAllFinancialAccountsForUser(model.parentId)
                .then(renderFinancialAccounts);

            console.log('before first yodlee call');
            yodleeService
                .getCOBSession()
                .then(loadYodleeSession)
        }
        init();

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
        }

        function loadYodleeSession(data) {

            console.log('after first yodlee call' + data.session.cobSession);
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

                    yodleeService
                        .getFastLinkToken(model.cobSession, model.userSession)
                        .then(function (data) {
                            model.apiToken = data.user.accessTokens[0].value;
                        })
                })
        }

        function deleteYodleeAccount(accountId) {
            yodleeService
                .deleteAccount(model.cobSession, model.userSession, accountId)
                .then(function (data) {
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