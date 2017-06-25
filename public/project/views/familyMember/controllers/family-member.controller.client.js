(function () {
    angular
        .module('OFM')
        .controller('familyMemberController', familyMemberController);

    function familyMemberController($location,
                                  currentUser,
                                  userService) {

        var model = this;
        model.loggedinUser = currentUser;

        model.deleteFamilyMember = deleteFamilyMember;
        model.createFamilyMember = createFamilyMember;
        model.selectUser = selectUser;
        model.updateFamilyMember = updateFamilyMember;
        model.logout = logout;

        function init() {
            findAllFamilyMembers()
        }
        init();

        function findAllFamilyMembers() {
            var houseHoldId;
            model.error= null;
            if(currentUser.role === 'HOUSEHOLD') {
                houseHoldId = currentUser._id;
            } else {
                houseHoldId = currentUser._houseHoldUser;
            }

            if(houseHoldId) {
                userService
                    .findAllFamilyMembers(houseHoldId)
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
        }

        function deleteFamilyMember(user) {
            model.error= null;
            userService
                .deleteFamilyMember(user._id)
                .then(findAllFamilyMembers);
        }

        function createFamilyMember(user) {
            if(!user.username) {
                model.error = "Username is required to create a new family member."
                return;
            }
            userService
                .findUserByUsername(user.username)
                .then(
                    function () {
                        model.error = "Sorry, Username already exists.";
                    },
                    function () {
                        user._houseHoldUser = currentUser._id;
                        return userService
                            .createFamilyMember(user)
                            .then(findAllFamilyMembers);
                    });
        }

        function selectUser(user) {
            model.user = user;
        }

        function updateFamilyMember(user) {
            model.error= null;
            userService
                .updateFamilyMember(user._id, user)
                .then(findAllFamilyMembers);
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