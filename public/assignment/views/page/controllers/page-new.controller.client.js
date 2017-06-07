(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
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

            if(page === null || typeof page === 'undefined') {
                model.error = 'Page name and title is required.';
                return;
            }

            if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required.';
                return;
            }

            if(page.title === null || page.title === '' || typeof page.title === 'undefined') {
                model.error = 'Page title is required.';
                return;
            }

            page.websiteId = model.websiteId;

            pageService
                .createPage(page)
                .then(function (page) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();