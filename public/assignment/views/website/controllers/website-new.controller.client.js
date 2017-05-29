(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        model.createWebsite = createWebsite;

        function createWebsite(website) {

            if(website === null || typeof website === 'undefined') {
                model.error = 'Website name and description is required.';
                return;
            }

            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = 'Website name is required.';
                return;
            }

            if(website.description === null || website.description === '' || typeof website.description === 'undefined') {
                model.error = 'Website description is required.';
                return;
            }

            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();