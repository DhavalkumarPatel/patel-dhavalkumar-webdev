(function () {
    angular
        .module('OFM')
        .controller('financialAccountEditController', financialAccountEditController);
    
    function financialAccountEditController($routeParams,
                                            $location,
                                            currentUser,
                                            financialAccountService,
                                            userService) {
        var model = this;

        model.userId = currentUser._id;
        model.financialAccountId = $routeParams.financialAccountId;

        function init() {
            financialAccountService
                .findAllFinancialAccountsForUser(model.userId)
                .then(renderFinancialAccounts);

            financialAccountService
                .findFinancialAccountById(model.financialAccountId)
                .then(renderFinancialAccount);
        }
        init();

        model.updateFinancialAccount = updateFinancialAccount;
        model.deleteFinancialAccount = deleteFinancialAccount;
        model.logout = logout;

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
        }

        function renderFinancialAccount(financialAccount) {
            model.financialAccount = financialAccount;
        }

        function updateFinancialAccount(financialAccount) {
            financialAccountService
                .updateFinancialAccount(financialAccount._id, financialAccount)
                .then(function () {
                    $location.url('/financialAccount');
                });
        }

        function deleteFinancialAccount(financialAccountId) {
            financialAccountService
                .deleteFinancialAccount(financialAccountId)
                .then(function () {
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