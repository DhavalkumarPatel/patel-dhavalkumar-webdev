(function () {
    angular
        .module('OFM')
        .controller('financialAccountListController', financialAccountListController);
    
    function financialAccountListController($routeParams,
                                            currentUser,
                                            $location,
                                            financialAccountService,
                                            userService) {
        var model = this;

        model.userId = currentUser._id;
        model.logout = logout;

        function init() {
            financialAccountService
                .findAllFinancialAccountsForUser(model.userId)
                .then(renderFinancialAccounts);
        }
        init();

        function renderFinancialAccounts(financialAccounts) {
            model.financialAccounts = financialAccounts;
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