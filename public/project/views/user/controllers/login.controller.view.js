(function () {
    angular
        .module('OFM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .login(username, password)
                .then(function (found) {
                    if(found !== null) {
                        if(found.role === 'ADMIN') {
                            $location.url('/admin');
                        } else {
                            $location.url('/profile');
                        }
                    } else {
                        model.error = "Incorrect credentials. Please enter valid Username and Password.";
                    }
                }, function () {
                    model.error = "Incorrect credentials. Please enter valid Username and Password.";
                });
        }
    }
})();