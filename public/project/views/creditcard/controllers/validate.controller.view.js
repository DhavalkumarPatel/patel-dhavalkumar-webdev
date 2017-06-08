(function () {
    angular
        .module('OFM')
        .controller('validateController', validateController);
    
    function validateController($location,
                               $routeParams,
                                creditcardService) {
        var model = this;

        model.userId = $routeParams['userId'];

        model.validateCreditcard = validateCreditcard;

        function validateCreditcard(creditcard) {
            console.log(creditcard);
            creditcardService
                .validateCreditcard(creditcard)
                .then(function(response) {
                    console.log(response.data);
                }, function () {
                    console.log('error');
                });
        }
    }
})();