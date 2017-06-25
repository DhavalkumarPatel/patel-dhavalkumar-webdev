(function () {
    angular
        .module('OFM')
        .controller('publicProfileController', publicProfileController);

    function publicProfileController($location,
                               $routeParams,
                               currentUser,
                               userService) {
        var model = this;
        model.userId = currentUser._id;
        model.publicUserId = $routeParams.publicUserId;
        model.logout = logout;

        function init() {
            userService
                .findRestrictedUserDetailsById(model.publicUserId)
                .then(renderUser);
        }
        init();

        function renderUser (user) {
            model.publicUser = user;
        }

        function userError(error) {
            model.error = "User not found.";
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