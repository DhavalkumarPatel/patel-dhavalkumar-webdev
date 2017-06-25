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
            getTransaction();
        }
        init();

        function getTransaction() {
            yodleeService
                .getTransactions(model.financialAccountId, '')
                .then(renderTransactions);
        }

        function renderTransactions(data) {
            for(var t in data.transaction) {
                if(data.transaction[t].id == model.transactionId) {
                    model.transaction = data.transaction[t];
                    break;
                }
            }
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