(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, website);
            $location.url('/user/'+model.userId+'/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWidget(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();