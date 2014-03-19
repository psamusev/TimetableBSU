/**
 * Created by Pavel on 4.3.14.
 */
angular.module('TimeTable.Content')
    .controller('ContentCtrl',[
        '$scope',
        'navigation',
        '$timeout',
        'translation',
        'loginService',
        function($scope,navigation,$timeout,loc,loginService){
            loc.setTranslation($scope);
            if(!loginService.isAuthorized()){
                navigation.stateNavigationTo('login',{},{location:'replace'});
            }

            $scope.doClick = function(data){
                switch (data){
                    case 1: navigation.stateNavigationTo('1course',{},{}); break;
                    case 2: navigation.stateNavigationTo('2course',{},{}); break;
                }
            };
        }]);