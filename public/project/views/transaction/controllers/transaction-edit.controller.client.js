(function () {
    angular
        .module('OFM')
        .controller('transactionEditController', transactionEditController);
    
    function transactionEditController($routeParams,
                                       $location,
                                       currentUser,
                                       transactionService,
                                       userService) {
        var model = this;

        model.userId = currentUser._id;
        model.transactionId = $routeParams.transactionId;
        model.financialAccountId = $routeParams.financialAccountId;

        model.updateTransaction = updateTransaction;
        model.deleteTransaction = deleteTransaction;
        model.logout = logout;

        function init() {
            transactionService
                .findTransactionById(model.transactionId)
                .then(renderTransaction);
        }
        init();

        function renderTransaction(transaction) {
            transaction.dateCreated = new Date(transaction.dateCreated);
            model.transaction = transaction;
        }

        function updateTransaction(transaction) {
            transactionService
                .updateTransaction(transaction._id, transaction)
                .then(function () {
                    $location.url('/financialAccount/' + model.financialAccountId + '/transaction');
                });
        }

        function deleteTransaction(transactionId) {
            transactionService
                .deleteTransaction(transactionId)
                .then(function () {
                    $location.url('/financialAccount/' + model.financialAccountId + '/transaction');
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