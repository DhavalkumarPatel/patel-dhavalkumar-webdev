(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService() {
        this.createWebsite = createWebsite;
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook Description" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Tweeter Description" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo Description" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Go Description" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic Tac Toe Description" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers Description" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess Description" }
        ];

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function findAllWebsitesForUser(userId) {
            var results = [];

            for(var v in websites) {
                if(websites[v].developerId === userId) {
                    websites[v].created = new Date();
                    websites[v].accessed = new Date();
                    results.push(websites[v]);
                }
            }
            return results;
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function updateWebsite(websiteId, website) {
            var websiteIn = findWebsiteById(websiteId);
            var index = websites.indexOf(websiteIn);
            websites.splice(index, 1, website);
        }

        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }
    }
})();