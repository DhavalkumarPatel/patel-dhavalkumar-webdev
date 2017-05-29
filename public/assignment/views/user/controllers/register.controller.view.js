(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required.';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "Both Passwords are required and they must match.";
                return;
            }

            var found = userService.findUserByUsername(username);
            
            if(found !== null) {
                model.error = "sorry, Username already exists.";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();