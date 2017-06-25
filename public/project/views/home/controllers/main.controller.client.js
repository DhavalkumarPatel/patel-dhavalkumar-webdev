(function () {
    angular
        .module('OFM')
        .controller('mainController', mainController);

    function mainController($location,
                            currentUser,
                            userService) {

        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function init() {
            userService
                .getHomePageStatistics()
                .then(function (data) {
                    model.data = data;
                })
        }
        init();

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