(function () {
    angular
        .module('OFM')
        .controller('financialAccountNewController', financialAccountNewController);
    
    function financialAccountNewController($routeParams,
                                            $location,
                                            currentUser,
                                            financialAccountService,
                                           userService) {
        var model = this;

        model.userId = currentUser._id;

        function init() {
            financialAccountService
                .findAllFinancialAccountsForUser(model.userId)
                .then(renderFinancialAccounts);
        }
        init();

        model.createFinancialAccount = createFinancialAccount;
        model.logout = logout;

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
        }

        function createFinancialAccount(financialAccount) {

            financialAccountService
                .createFinancialAccount(model.userId, financialAccount)
                .then(function (financialAccount) {
                    $location.url('/financialAccount');
                });
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