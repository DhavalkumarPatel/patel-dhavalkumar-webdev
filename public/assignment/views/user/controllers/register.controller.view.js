(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Both Passwords must match.";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry, Username already exists.";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    }
                )
        }
    }
})();