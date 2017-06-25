(function () {
    angular
        .module('OFM')
        .service('transactionService', transactionService);

    function transactionService($http) {

        this.createTransaction = createTransaction;
        this.findAllTransactionsForUser = findAllTransactionsForUser;
        this.findAllTransactionsForAccount = findAllTransactionsForAccount;
        this.findTransactionById = findTransactionById;
        this.updateTransaction = updateTransaction;
        this.deleteTransaction = deleteTransaction;
        this.queryTransactionsForAccount = queryTransactionsForAccount;

        function createTransaction(userId, transaction) {
            var url = "/api/project/user/" + userId + "/transaction";
            return $http.post(url, transaction)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTransactionsForUser(userId) {
            var url = "/api/project/user/" + userId + "/transaction";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTransactionsForAccount(accountId) {
            var url = "/api/project/account/" + accountId + "/transaction";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function queryTransactionsForAccount(accountId, category, dateFrom, dateTo) {

            if(!dateFrom) dateFrom='NA';
            if(!dateTo) dateTo='NA';
            category = category.toString().replace(new RegExp('/', 'g'), '-');
            var url = "/api/project/account/" + accountId + "/queryTransaction/" + category + "/" + dateFrom + "/" + dateTo;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTransactionById(transactionId) {
            var url = "/api/project/transaction/" + transactionId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateTransaction(transactionId, transaction) {
            var url = "/api/project/transaction/" + transactionId;
            return $http.put(url, transaction)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteTransaction(transactionId) {
            var url =  "/api/project/transaction/" + transactionId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();