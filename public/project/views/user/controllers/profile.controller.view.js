(function () {
    angular
        .module('OFM')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               currentUser,
                               userService) {

        var model = this;
        model.userId = currentUser._id;

        model.updateProfile = updateProfile;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser);

        }
        init();

        function updateProfile(user) {
            userService
                .updateProfile(user._id, user)
                .then(function () {
                    model.message = 'User profile updated successfully.';
                })
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
            user.dob = new Date(user.dob);
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found.";
        }
    }
})();