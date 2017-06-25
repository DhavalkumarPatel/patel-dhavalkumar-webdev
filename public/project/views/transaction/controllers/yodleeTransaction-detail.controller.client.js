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
            loadYodleeTransactions();
        }
        init();

        function loadYodleeTransactions() {
            if(!(model.cobSession && model.userSession)) {
                yodleeService
                    .getCOBSession()
                    .then(function (data) {
                        model.cobSession = data.session.cobSession;

                        yodleeService
                            .getUserSession(model.cobSession)
                            .then(function (data) {
                                model.userSession = data.user.session.userSession;
                                getTransaction();
                            })
                    });
            } else {
                getTransaction();
            }
        }

        function getTransaction() {
            yodleeService
                .getTransactions(model.cobSession, model.userSession, model.financialAccountId, '')
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