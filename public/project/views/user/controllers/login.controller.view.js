(function () {
    angular
        .module('OFM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required.';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = "Passwords is required.";
                return;
            }

            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/user/' + found._id);
                    } else {
                        model.error = "Incorrect credentials. Please enter valid Username and Password.";
                    }
                });
        }
    }
})();