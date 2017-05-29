(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.widgetUrl = widgetUrl;

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }
    }
})();