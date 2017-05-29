(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService() {
        this.createPage = createPage;
        this.findAllPagesByWebsiteId = findAllPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Post 1 title" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Post 2 title" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Post 3 title" }
        ];

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            page.created = new Date();
            pages.push(page);
            return page;
        }

        function findAllPagesByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    results.push(pages[p]);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId)
                    return pages[p];
            }
            return null;
        }

        function updatePage(pageId, page) {
            var pageIn = findPageById(pageId);
            var index = pages.indexOf(pageIn);
            pages.splice(index, 1, page);
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }
    }
})();