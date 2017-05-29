(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService); // It uses factory design pattern
    
    function userService() {
        var users = [
            {_id: "123", username: "Alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "alice@wonder.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@marley.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",   email: "charly@garcia.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",   email: "jose@annunzi.com" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for(var u in users) {
                if(users[u]._id === userId)
                    return users[u];
            }
            return null;
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined') {
                return null;
            }
            return user;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            var userIn = findUserById(userId);
            var index = users.indexOf(userIn);
            users.splice(index, 1, user);
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
})();