(function () {
    angular
        .module('OFM')
        .controller('adminController', adminController);

    function adminController($location,
                             userService,
                             currentUser) {

        var model = this;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
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

        function renderUser (user) {
            user.dob = new Date(user.dob);
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found.";
        }
    }
})();