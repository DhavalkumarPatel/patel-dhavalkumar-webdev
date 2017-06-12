(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService($http) {
        this.createPage = createPage;
        this.findAllPagesByWebsiteId = findAllPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(page) {
            var url = "/api/assignment/website/" + page.websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesByWebsiteId(websiteId) {
            var url =  "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(websiteId, pageId) {
            var url =  "/api/assignment/website/" + websiteId + "/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();