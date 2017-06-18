(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 currentUser,
                                 widgetService) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.createWidget = createWidget;

        var newHeader = {
            name: "Default header name",
            widgetType: "HEADING",
            size: "2",
            text: "Default header text"};

        var newImage = {
            widgetType: "IMAGE",
            name: "Default image name",
            text: "Default image text",
            width: "100%",
            url: "http://lorempixel.com/400/200/"
        };

        var newYoutube = {
            widgetType: "YOUTUBE",
            name: "Default youtube name",
            text: "Default youtube text",
            width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        };

        var newText = {
            name: "Default input name",
            widgetType: "TEXT",
            text: "Default input text",
            rows: 3,
            placeholder: "Placeholder text",
            formatted: false
        };

        var newHTML = {
            widgetType: "HTML",
            name: "Name for HTML Widget",
            text: "<b>Text for HTML Widget</b>"
        }

        function createWidget(widgetType) {
            var newWidget = {};
            if (widgetType === 'HEADING') {
                newWidget = newHeader;
            } else if (widgetType === 'IMAGE') {
                newWidget = newImage;
            } else if (widgetType === 'YOUTUBE') {
                newWidget = newYoutube;
            } else if (widgetType === 'TEXT') {
                newWidget = newText;
            } else if (widgetType === 'HTML') {
                newWidget = newHTML;
            }
            newWidget.pageId = model.pageId;

            widgetService
                .createWidget(newWidget)
                .then(function (newWidget) {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+newWidget._id);
                });
        }
    }
})();