(function () {
    angular
        .module('OFM')
        .controller('followUserListController', followUserListController);

    function followUserListController($routeParams,
                                      currentUser,
                                      $location,
                                      followUserService,
                                      userService) {
        var model = this;

        model.userId = currentUser._id;
        model.unfollowUser = unfollowUser;
        model.logout = logout;

        function init() {
            loadFollowedUsers();
        }
        init();

        function renderFollowedUsers(followedUsers) {
            model.followedUsers = followedUsers;
        }

        function unfollowUser(followedUserId) {
            followUserService
                .unfollowUser(model.userId, followedUserId)
                .then(function (followUserObj) {
                    loadFollowedUsers();
                });
        }

        function loadFollowedUsers() {
            followUserService
                .findAllFollowUsersForUser(model.userId)
                .then(renderFollowedUsers);
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