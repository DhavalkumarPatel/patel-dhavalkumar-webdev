(function () {
    angular
        .module('OFM')
        .service('yodleeService', yodleeService);

    function yodleeService($http) {

        this.getCOBSession = getCOBSession;
        this.getUserSession = getUserSession;
        this.getFastLinkToken = getFastLinkToken;
        this.getTransactions = getTransactions;
        this.getAccounts = getAccounts;
        this.deleteAccount = deleteAccount;

        function getCOBSession() {
            var url = "/api/project/yodlee/cobsession";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getUserSession() {
            var url = "/api/project/yodlee/usersession";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getFastLinkToken() {
            var url = "/api/project/yodlee/fastlinktoken";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAccounts() {
            var url = "/api/project/yodlee/account";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteAccount(accountId) {
            var url = "/api/project/yodlee/account/" + accountId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTransactions(accountId, queryParameters) {
            var url = "/api/project/yodlee/transaction";
            return $http.post(url, {queryParameters: "accountId=" + accountId + queryParameters})
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();