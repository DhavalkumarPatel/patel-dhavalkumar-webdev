(function () {
    angular
        .module('WebAppMaker')
        .controller('mainController', mainController);

    function mainController($location,
                            currentUser,
                            userService) {

        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    model.currentUser = null;
                    $location.url('/');
                });
        }
    }
})();