(function () {
    angular
        .module('OFM')
        .service('yodleeService', yodleeService);

    function yodleeService($http) {

        this.getCOBSession = getCOBSession;
        this.getUserSession = getUserSession;
        this.getTransactions = getTransactions;
        this.getTransactionById = getTransactionById;
        this.getFastLinkToken = getFastLinkToken;
        this.getAccounts = getAccounts;
        this.deleteAccount = deleteAccount;

        function getCOBSession() {

            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login';
            var cobrandParam = {
                "cobrand":      {
                    "cobrandLogin": "sbCobdspatel28",
                    "cobrandPassword": "5162ecae-9446-4fa0-adda-6a1a01d45da4",
                    "locale": "en_US"
                }
            };

            return $http.post(url, cobrandParam)
                .then(function (response) {
                    return response.data;
                })
        }

        function getUserSession(cobSession) {
            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/user/login';

            var userParam = {
                "user":      {
                    "loginName": "sbMemdspatel281",
                    "password": "sbMemdspatel281#123",
                    "locale": "en_US"
                }
            };

            return $http.post(url, userParam,
                {headers : {'Authorization': 'cobSession=' + cobSession}})
                .then(function (response) {
                    return response.data;
                })
        }

        function getAccounts(cobSession, userSession) {
            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/accounts';

            return $http.get(url, {headers : {'Authorization': 'userSession='+userSession+', cobSession='+cobSession}})
                .then(function (response) {
                    return response.data;
                });
        }

        function getTransactions(cobSession, userSession, accountId, queryParameters) {
            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/transactions?accountId=' + accountId + queryParameters;

            return $http.get(url, {headers : {'Authorization': 'userSession='+userSession+', cobSession='+cobSession}})
                .then(function (response) {
                    return response.data;
                });
        }

        function getTransactionById(cobSession, userSession, transactionId) {
            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/transactions?id=' + transactionId;
            return $http.get(url, {headers : {'Authorization': 'userSession='+userSession+', cobSession='+cobSession}})
                .then(function (response) {
                    return response.data;
                });
        }

        function getFastLinkToken(cobSession, userSession) {

            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/user/accessTokens?appIds=10003600';

            return $http.get(url, {headers : {'Authorization': 'userSession='+userSession+', cobSession='+cobSession}})
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteAccount(cobSession, userSession, accountId) {
            var url = 'https://developer.api.yodlee.com/ysl/restserver/v1/accounts/' + accountId;

            return $http.delete(url, {headers : {'Authorization': 'userSession='+userSession+', cobSession='+cobSession}})
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();