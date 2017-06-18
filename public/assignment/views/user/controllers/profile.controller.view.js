(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               currentUser,
                               userService) {
        var model = this;
        model.userId = currentUser._id;

        function init() {
            renderUser(currentUser);
        }
        init();

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

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
                    $location.url('/login');
                }, function () {
                    model.error = "Unable to delete the user.";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function unregister() {
            userService
                .unregister()
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