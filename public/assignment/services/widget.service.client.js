(function(){
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService); // It uses factory design pattern

    function widgetService () {

        var widgets = [
                { "_id": "123",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
                    "text": "GIZMODO H2",       "size": "2" },
                { "_id": "234",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
                    "text": "Heading size 4",   "size": "4" },
                { "_id": "345",     "widgetType": "IMAGE",      "pageId": "321", "name": "Image name",
                    "text": "some image text",   "width": "100%", "url": "http://lorempixel.com/400/200/" },
                { "_id": "456",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
                    "text": "<p>HTML Paragraph 1</p>" },
                { "_id": "567",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
                    "text": "Heading size 4",   "size": "4" },
                { "_id": "678",     "widgetType": "YOUTUBE",    "pageId": "321", "name": "Youtube name",
                    "text": "some youtube text",   "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
                    "text": "<p>HTML Paragraph 2</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget (pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.created = new Date();
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId (pageId) {
            var results = [];
            for(var w in widgets) {
                if(widgets [w].pageId === pageId) {
                    results.push(widgets [w]);
                }
            }
            return results;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets ) {
                if(widgets [w]._id === widgetId)
                    return widgets [w];
            }
            return null;
        }

        function updateWidget (widgetId, widget) {
            var widgetIn = findWidgetById(widgetId);
            var index = widgets.indexOf(widgetIn);
            widgets .splice(index, 1, widget);
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets .indexOf(widget);
            widgets .splice(index, 1);
        }
    }
})();