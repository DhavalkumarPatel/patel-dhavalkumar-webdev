(function(){
    angular
        .module('OFM')
        .factory('creditcardService', creditcardService); // It uses factory design pattern

    function creditcardService($http) {

        var api = {
            validateCreditcard: validateCreditcard
        };
        return api;

        function validateCreditcard(creditcard) {
            console.log(creditcard);

            var key = "5fc9cc11e11c9cc3611306ff3bd73fa6";
            var urlBase = "https://sandbox.api.visa.com/cybersource/payments/v1/authorizations?apikey=API_KEY";

            var cCard = {
                "cardCvv2Value": "672" /*creditcard.cvv*/,
                "cardExpiryDate": "2018-06" /*creditcard.date*/,
                "primaryAccountNumber": "4957030000313108" /*creditcard.cardno*/
            };

            var url = urlBase
                .replace("API_KEY", key)
            return $http.post(url, creditcard);
        }
    }
})();