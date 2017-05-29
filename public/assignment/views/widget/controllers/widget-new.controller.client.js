(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 widgetService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.createHeaderWidget = createHeaderWidget;
        model.createImageWidget = createImageWidget;
        model.createYoutubeWidget = createYoutubeWidget;

        function createHeaderWidget() {
            var newHeader = {
                name: "default header name",
                widgetType: "HEADING",
                size: "2",
                text: "default header text"};

            newHeader = widgetService.createWidget(model.pageId, newHeader) ;
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+newHeader._id);
        }

        function createImageWidget() {
            var newHeader = {
                widgetType: "IMAGE",
                name: "default image name",
                text: "default image text",
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            };

            newHeader = widgetService.createWidget(model.pageId, newHeader) ;
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+newHeader._id);
        }

        function createYoutubeWidget() {
            var newHeader = {
                widgetType: "YOUTUBE",
                name: "default youtube name",
                text: "default youtube text",
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            };

            newHeader = widgetService.createWidget(model.pageId, newHeader) ;
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+newHeader._id);
        }
    }
})();