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
            model.loading = true;
            if(currentUser.role === 'FAMILY-MEMBER') {
                model.parentId = currentUser._houseHoldUser;
            }
            financialAccountService
                .findAllFinancialAccountsForUser(model.parentId)
                .then(renderFinancialAccounts);

            /*yodleeService
                .getCOBSession()
                .then(loadYodleeSession, function (err) {
                    model.loading = false;
                })*/
            model.loading = false;
        }
        init();

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
        }

        function loadYodleeSession(data) {

            model.cobSession = data.COB_SESSION;

            yodleeService
                .getUserSession()
                .then(function (data) {
                    model.userSession = data.USER_SESSION;

                    yodleeService
                        .getAccounts()
                        .then(function (data) {
                            model.loading=false;
                            model.yodleeAccounts = data.account;
                        })

                    yodleeService
                        .getFastLinkToken()
                        .then(function (data) {
                            model.apiToken = data.FAST_LINK_TOKEN;
                        })
                })
        }

        function deleteYodleeAccount(accountId) {
            model.loading=true;
            yodleeService
                .deleteAccount(accountId)
                .then(function (data) {
                    yodleeService
                        .getAccounts()
                        .then(function (data) {
                            model.loading=false;
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