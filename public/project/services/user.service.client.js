(function(){
    angular
        .module('OFM')
        .factory('userService', userService); // It uses factory design pattern
    
    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findRestrictedUserDetailsById: findRestrictedUserDetailsById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers : findAllUsers,
            findAllUsersForRole : findAllUsersForRole,
            findAllFamilyMembers : findAllFamilyMembers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            loggedin: loggedin,
            checkAdmin : checkAdmin,
            checkHH_FM : checkHH_FM,
            checkHH : checkHH,
            register: register,
            unregister: unregister,
            updateProfile: updateProfile,
            createFamilyMember: createFamilyMember,
            updateFamilyMember: updateFamilyMember,
            deleteFamilyMember: deleteFamilyMember,
            getHomePageStatistics: getHomePageStatistics
        };
        return api;

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRestrictedUserDetailsById(publicUserId) {
            var url = "/api/project/user/public/" + publicUserId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllUsers() {
            var url = "/api/project/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsersForRole(roleName) {
            var url = "/api/project/user/role/" + roleName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFamilyMembers(userId) {
            var url = "/api/project/familyMember/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateProfile(userId, user) {
            var url = "/api/project/updateProfile/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }


        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkHH_FM() {
            var url = "/api/project/checkHH_FM";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkHH() {
            var url = "/api/project/checkHH";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url = "/api/project/unregister";
            return $http.post(url, {})
                .then(function (response) {
                    return response.data;
                });
        }

        function createFamilyMember(user) {
            var url = "/api/project/familyMember";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateFamilyMember(userId, user) {
            var url = "/api/project/familyMember/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteFamilyMember(userId) {
            var url = "/api/project/familyMember/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getHomePageStatistics() {
            var url = "/api/project/home/stats";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();