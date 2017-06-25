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
    }
})();