(function () {
    angular
        .module('OFM')
        .service('financialAccountService', financialAccountService);

    function financialAccountService($http) {

        this.createFinancialAccount = createFinancialAccount;
        this.findAllFinancialAccountsForUser = findAllFinancialAccountsForUser;
        this.findFinancialAccountById = findFinancialAccountById;
        this.updateFinancialAccount = updateFinancialAccount;
        this.deleteFinancialAccount = deleteFinancialAccount;
        this.findAllFinancialAccounts = findAllFinancialAccounts;

        function findAllFinancialAccounts() {

            var url ="/api/project/financialAccounts";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createFinancialAccount(userId, financialAccount) {
            var url = "/api/project/user/" + userId + "/financialAccount";
            return $http.post(url, financialAccount)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFinancialAccountsForUser(userId) {
            var url = "/api/project/user/" + userId + "/financialAccount";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFinancialAccountById(financialAccountId) {
            var url = "/api/project/financialAccount/" + financialAccountId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateFinancialAccount(financialAccountId, financialAccount) {
            var url = "/api/project/financialAccount/" + financialAccountId;
            return $http.put(url, financialAccount)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteFinancialAccount(financialAccountId) {
            var url =  "/api/project/financialAccount/" + financialAccountId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();