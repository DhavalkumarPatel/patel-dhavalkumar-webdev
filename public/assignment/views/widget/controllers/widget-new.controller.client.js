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

        model.createWidget = createWidget;

        var newHeader = {
            name: "default header name",
            widgetType: "HEADING",
            size: "2",
            text: "default header text"};

        var newImage = {
            widgetType: "IMAGE",
            name: "default image name",
            text: "default image text",
            width: "100%",
            url: "http://lorempixel.com/400/200/"
        };

        var newYoutube = {
            widgetType: "YOUTUBE",
            name: "default youtube name",
            text: "default youtube text",
            width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        };

        function createWidget(widgetType) {
            var newWidget = {};
            if (widgetType === 'HEADING') {
                newWidget = newHeader;
            } else if (widgetType === 'IMAGE') {
                newWidget = newImage;
            } else if (widgetType === 'YOUTUBE') {
                newWidget = newYoutube;
            }
            newWidget.pageId = model.pageId;

            widgetService
                .createWidget(newWidget)
                .then(function (newWidget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+newWidget._id);
                });
        }
    }
})();