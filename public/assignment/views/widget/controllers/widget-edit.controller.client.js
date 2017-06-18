(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  currentUser,
                                  widgetService) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function renderWidget(widget) {
            model.widget = widget;
            model.url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/website/'+model.websiteId+"/page/"+model.pageId+"/widget");
                });
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(model.pageId, widgetId)
                .then(function () {
                    $location.url('/website/'+model.websiteId+"/page/"+model.pageId+"/widget");
                });
        }
    }
})();