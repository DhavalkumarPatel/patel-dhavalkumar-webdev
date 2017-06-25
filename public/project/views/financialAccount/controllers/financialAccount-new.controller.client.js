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

        model.createFinancialAccount = createFinancialAccount;
        model.logout = logout;

        function createFinancialAccount(financialAccount) {
            financialAccount.yodlee = false;
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