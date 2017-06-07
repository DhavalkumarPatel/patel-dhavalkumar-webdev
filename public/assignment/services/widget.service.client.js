(function(){
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService); // It uses factory design pattern

    function widgetService ($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sortWidget : sortWidget
        };
        return api;

        function createWidget (widget) {
            var url = "/api/assignment/page/" + widget.pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId (pageId) {
            var url =  "/api/assignment/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget (widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url =  "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidget (pageId, initial, final) {
            var url = "/api/assignment/page/" + pageId + "/widget?initial="+initial+"&final="+final;
            return $http.put(url, {"pageId": pageId})
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();