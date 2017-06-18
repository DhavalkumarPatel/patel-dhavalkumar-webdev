(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        model.createWebsite = createWebsite;

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {

            website.developerId = model.userId;

            websiteService
                .createWebsite(website)
                .then(function (website) {
                    $location.url('/website');
                });
        }
    }
})();