(function () {
    angular
        .module('OFM')
        .controller('transactionNewController', transactionNewController);
    
    function transactionNewController($routeParams,
                                      $location,
                                      currentUser,
                                      transactionService,
                                      userService) {
        var model = this;

        model.userId = currentUser._id;
        model.parentId = currentUser._id;
        model.financialAccountId = $routeParams.financialAccountId;

        model.createTransaction = createTransaction;
        model.logout = logout;

        function init() {
            if(currentUser.role === 'FAMILY-MEMBER') {
                model.parentId = currentUser._houseHoldUser;
            }
        }
        init();

        function createTransaction(transaction) {
            transaction._account = model.financialAccountId;
            transactionService
                .createTransaction(model.parentId, transaction)
                .then(function (transaction) {
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