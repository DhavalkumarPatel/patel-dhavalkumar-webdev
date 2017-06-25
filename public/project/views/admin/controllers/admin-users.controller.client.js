(function () {
    angular
        .module('OFM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController($location,
                                  currentUser,
                                  userService) {

        var model = this;

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.logout = logout;

        function init() {
            findAllusers()
        }
        init();

        function findAllusers() {
            model.error= null;
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = angular.copy(users);
                    if(model.users) {
                        for(var u in model.users){
                            if(model.users[u]._id === currentUser._id){
                                model.users.splice(u, 1);
                            }
                        }
                    }
                });
        }

        function deleteUser(user) {
            model.error= null;
            userService
                .deleteUser(user._id)
                .then(findAllusers);
        }

        function createUser(user) {
            if(!user.username) {
                model.error = "Username is required to create a new user."
                return;
            }

            userService
                .findUserByUsername(user.username)
                .then(
                    function () {
                        model.error = "Sorry, Username already exists.";
                    },
                    function () {
                        return userService
                            .createUser(user)
                            .then(findAllusers);
                    });
        }

        function selectUser(user) {
            model.user = user;
        }

        function updateUser(user) {
            model.error= null;
            userService
                .updateUser(user._id, user)
                .then(findAllusers);
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