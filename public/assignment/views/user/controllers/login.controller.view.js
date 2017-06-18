(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .login(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/profile');
                    } else {
                        model.error = "Incorrect credentials. Please enter valid Username and Password.";
                    }
                }, function () {
                    model.error = "Incorrect credentials. Please enter valid Username and Password.";
                });
        }
    }
})();