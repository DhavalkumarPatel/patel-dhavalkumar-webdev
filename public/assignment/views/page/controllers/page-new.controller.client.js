(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                               $location,
                               currentUser,
                               pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

        function init() {
            pageService
                .findAllPagesByWebsiteId(model.websiteId)
                .then(renderPages);
        }
        init();

        model.createPage = createPage;

        function renderPages(pages) {
            model.pages = pages;
        }

        function createPage(page) {

            page.websiteId = model.websiteId;

            pageService
                .createPage(page)
                .then(function (page) {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }
    }
})();