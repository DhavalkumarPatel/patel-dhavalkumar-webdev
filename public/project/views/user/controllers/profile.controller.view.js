(function () {
    angular
        .module('OFM')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               userService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = 'User profile updated successfully.';
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you.";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found.";
        }
    }
})();