(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                $location,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;

        function init() {
            model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();