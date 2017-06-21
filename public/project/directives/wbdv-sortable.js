(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($location,
                         widgetService) {
        var orgLoc = -1;
        function linkFunction(scope, element) {
            $(element).sortable({
                start: function( event, ui ) {
                    var index = $('li', $(ui.item).parent()).index(ui.item);
                    orgLoc = index;
                }
            }, {
                update: function( event, ui ) {
                    var index = $('li', $(ui.item).parent()).index(ui.item);
                    widgetService
                        .sortWidget(scope.model.pageId, orgLoc, index)
                        .then(function () {
                            $location.url('/website/'+scope.model.websiteId+"/page/"+scope.model.pageId+"/widget");
                        });
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();