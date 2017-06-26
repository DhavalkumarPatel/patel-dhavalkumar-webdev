(function () {
    angular
        .module('OFM')
        .controller('yodleeTransactionDetailController', yodleeTransactionDetailController);

    function yodleeTransactionDetailController($routeParams,
                                               $location,
                                               currentUser,
                                               yodleeService) {

        var model = this;

        model.userId = currentUser._id;
        model.financialAccountId = $routeParams.financialAccountId;
        model.transactionId = $routeParams.transactionId;
        model.logout = logout;

        function init() {
            model.loading=true;
            getTransaction();
        }
        init();

        function getTransaction() {
            yodleeService
                .getTransactions(model.financialAccountId, '')
                .then(renderTransactions, function (err) {
                    model.loading = false;
                });
        }

        function renderTransactions(data) {
            for(var t in data.transaction) {
                if(data.transaction[t].id == model.transactionId) {
                    model.transaction = data.transaction[t];
                    break;
                }
            }
            model.loading = false;
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