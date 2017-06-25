(function () {
    angular
        .module('OFM')
        .controller('followUserNewController', followUserNewController);

    function followUserNewController($routeParams,
                                     $location,
                                     currentUser,
                                     followUserService,
                                     userService) {
        var model = this;

        model.userId = currentUser._id;

        model.followUser = followUser;
        model.searchUser = searchUser;
        model.logout = logout;

        function  init() {
            searchUser('All');
        }
        init();

        function followUser(followedUserId) {
            followUserService
                .followUser(model.userId, followedUserId)
                .then(function (followUserObj) {
                    $location.url('/followUser');
                });
        }

        function searchUser(searchText) {
            followUserService
                .searchUser(model.userId, searchText)
                .then(function (userList) {
                    model.userList = userList;
                });
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