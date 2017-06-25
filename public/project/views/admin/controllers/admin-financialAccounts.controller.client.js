(function () {
    angular
        .module('OFM')
        .controller('adminFinancialAccountsController', adminFinancialAccountsController);

    function adminFinancialAccountsController($location,
                                  currentUser,
                                  userService,
                                  financialAccountService) {

        var model = this;

        model.deleteFinancialAccount = deleteFinancialAccount;
        model.createFinancialAccount = createFinancialAccount;
        model.selectFinancialAccount = selectFinancialAccount;
        model.updateFinancialAccount = updateFinancialAccount;
        model.findAllFinancialAccounts = findAllFinancialAccounts;
        model.findAllusersForRole = findAllusersForRole;
        model.logout = logout;

        function init() {
            findAllusersForRole();
            findAllFinancialAccounts();
        }
        init();

        function findAllusersForRole() {
            userService
                .findAllUsersForRole('HOUSEHOLD')
                .then(function (users) {
                    model.users = angular.copy(users);
                });
        }

        function findAllFinancialAccounts() {
            financialAccountService
                .findAllFinancialAccounts()
                .then(function (financialAccounts) {
                    model.financialAccounts = angular.copy(financialAccounts);
                });
        }

        function deleteFinancialAccount(financialAccount) {
            model.error = null;
            financialAccountService
                .deleteFinancialAccount(financialAccount._id)
                .then(findAllFinancialAccounts);
        }

        function createFinancialAccount(financialAccount) {
            if(!(model.financialAccount && model.financialAccount._user))
            {
                model.error = 'User is required to create a new account.';
                return;
            }
            var userId = model.financialAccount._user;
            financialAccountService
                .createFinancialAccount(userId, financialAccount)
                .then(findAllFinancialAccounts);
        }

        function selectFinancialAccount(financialAccount) {
            model.error = null;
            model.financialAccount = financialAccount;
        }

        function updateFinancialAccount(financialAccount) {
            model.error = null;
            financialAccountService
                .updateFinancialAccount(financialAccount._id, financialAccount)
                .then(findAllFinancialAccounts);
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