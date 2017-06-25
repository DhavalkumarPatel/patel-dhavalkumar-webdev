(function () {
    angular
        .module('OFM')
        .controller('transactionListController', transactionListController);
    
    function transactionListController($routeParams,
                                       currentUser,
                                       $location,
                                       transactionService,
                                       userService) {
        var model = this;

        model.userId = currentUser._id;
        model.financialAccountId = $routeParams.financialAccountId;

        model.searchTransaction = searchTransaction;
        model.logout = logout;

        function init() {
            transactionService
                .findAllTransactionsForAccount(model.financialAccountId)
                .then(renderTransactions);
        }
        init();

        function renderTransactions(transactions) {
            model.transactions = transactions;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function searchTransaction(searchObj) {
            transactionService
                .queryTransactionsForAccount(model.financialAccountId, searchObj.category, searchObj.dateFrom, searchObj.dateTo)
                .then(renderTransactions);
        }
    }
})();