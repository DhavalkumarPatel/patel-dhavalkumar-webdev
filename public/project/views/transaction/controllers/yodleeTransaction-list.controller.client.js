(function () {
    angular
        .module('OFM')
        .controller('yodleeTransactionListController', yodleeTransactionListController);

    function yodleeTransactionListController($routeParams,
                                             $filter,
                                       currentUser,
                                       $location,
                                       yodleeService,
                                       userService) {
        var model = this;

        model.userId = currentUser._id;
        model.financialAccountId = $routeParams.financialAccountId;
        model.searchTransaction = searchTransaction;

        model.logout = logout;

        function init() {
            getTransactions();
        }
        init();

        function getTransactions() {
            yodleeService
                .getTransactions(model.financialAccountId, '')
                .then(renderTransactions);
        }

        function renderTransactions(data) {
            model.transactions = data.transaction;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function searchTransaction(searchObj) {

            var queryParameters = '';

            if(searchObj.category !== '0') {
                queryParameters += '&categoryId=' + searchObj.category;
            }

            if(searchObj.dateFrom) {
                queryParameters += '&fromDate=' + $filter('date')(searchObj.dateFrom, "yyyy-MM-dd");
            }

            if(searchObj.dateTo) {
                queryParameters += '&toDate=' + $filter('date')(searchObj.dateTo, "yyyy-MM-dd");
            }

            yodleeService
                .getTransactions(model.financialAccountId, queryParameters)
                .then(renderTransactions);
        }
    }
})();