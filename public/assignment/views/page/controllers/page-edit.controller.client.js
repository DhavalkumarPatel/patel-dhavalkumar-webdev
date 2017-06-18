(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                $location,
                                currentUser,
                                pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;

        function init() {
            pageService
                .findAllPagesByWebsiteId(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function renderPages(pages) {
            model.pages = pages;
        }

        function renderPage(page) {
            model.page = page;
        }

        function updatePage(page) {
            pageService
                .updatePage(model.pageId, page)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }

        function deletePage(websiteId, pageId) {
            pageService
                .deletePage(websiteId, pageId)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }
    }
})();