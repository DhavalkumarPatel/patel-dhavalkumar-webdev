(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               userService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.user = userService.findUserById(model.userId);
        }
        init();

        model.updateUser = updateUser;

        function updateUser(user) {
            userService.updateUser(model.userId, user);
            model.user = userService.findUserById(model.userId);
            model.message = 'Profile updated successfully.';
        }
    }
})();