(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }
        init();

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function () {
                    $location.url('/website');
                });
        }

        function deleteWebsite(userId, websiteId) {
            websiteService
                .deleteWebsite(userId, websiteId)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();