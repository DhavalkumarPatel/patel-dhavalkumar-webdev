(function () {
    angular
        .module('OFM')
        .service('followUserService', followUserService);

    function followUserService($http) {

        this.followUser = followUser;
        this.findAllFollowUsersForUser = findAllFollowUsersForUser;
        this.unfollowUser = unfollowUser;
        this.searchUser = searchUser;

        function followUser(followingUserId, followedUserId) {
            var followUserObj = {
                _userFollowing: followingUserId,
                _userFollowed: followedUserId
            }
            var url = "/api/project/followUser";
            return $http.post(url, followUserObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFollowUsersForUser(followingUserId) {
            var url = "/api/project/followUser/" + followingUserId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollowUser(followingUserId, followedUserId) {
            var url =  "/api/project/followUser/" + followingUserId + "/" + followedUserId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchUser(followingUserId, searchText) {
            var url = "/api/project/followUser/" + followingUserId + "/search/" + searchText;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();