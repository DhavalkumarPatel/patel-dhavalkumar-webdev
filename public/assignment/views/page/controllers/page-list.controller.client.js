(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
           model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
        }
        init();
    }
})();