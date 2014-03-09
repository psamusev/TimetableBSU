/**
 * Created by Pavel on 4.3.14.
 */
angular.module('TimeTable.Content')
    .controller('ContentCtrl',[
        '$scope',
        '$state',
        '$timeout',
        'translation',
        function($scope,$state,$timeout,loc){
            loc.setTranslation($scope);
            //$timeout(function(){
                //$state.transitionTo('1course',{},{inherit:true});
            //},100);

            $scope.doClick = function(data){
                switch (data){
                    case 1: $state.transitionTo('1course',{},{}); break;
                    case 2: $state.transitionTo('2course',{},{}); break;
                }
            };
        }]);