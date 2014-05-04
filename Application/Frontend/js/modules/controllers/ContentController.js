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
            $scope.$parent.registActive = false;
            loc.setTranslation($scope);
            if(!loginService.isAuthorized()){
                navigation.go('login');
            }
            var paramsUrl = navigation.getStateParams();
            switch (paramsUrl.c){
                case 'firstCourse': $scope.course = 1; break;
                case 'secondCourse': $scope.course = 2; break;
            }

            $scope.doClick = function(data){
                switch (data){
                    case 1: navigation.stateNavigationTo('content',{c:'firstCourse'},{}); break;
                    case 2: navigation.stateNavigationTo('content',{c:'secondCourse'},{}); break;
                }
            };

            $scope.logout = function(){
                loginService.logout();
                navigation.go('login');
            }
        }
    ]);