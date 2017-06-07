(function () {
    angular
        .module('DirectiveLecture', [])
        .directive('hello', helloTag)
        .directive('wdDraggable', wdDraggable);
    
    function wdDraggable() {

        function linkFunction(scope, element) {
            $(element).sortable({
                update: function( event, ui ) {
                    var index = $('li', $(ui.item).parent()).index(ui.item);
                    console.log(index);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
    
    function helloTag() {
        
        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }
        
        return {
            templateUrl: 'hello.html',
            link: linkFunction
        }
    }
})();