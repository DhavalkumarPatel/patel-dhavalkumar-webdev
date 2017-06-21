(function () {
    angular
        .module('OFM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams,
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

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();