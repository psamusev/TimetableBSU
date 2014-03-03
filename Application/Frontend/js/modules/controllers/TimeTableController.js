/**
 * Created by Pavel on 3.3.14.
 */
angular.module('timetableBSU')
    .controller("TimeTableCtrl",[
        '$scope',
        '$timeout',
        '$state',
        'TranslationService',
        function($scope,$timeout,$state,loc){
            loc.create();
            $scope.title = 'My title';
            $timeout(function(){
                loc.setTranslation($scope);
                $scope.ready = true;
                $state.transitionTo('login',{},{});
            },100);
            $scope.doClick = function(data){
                switch (data){
                    case 1: $state.transitionTo('login',{},{}); break;
                    case 2: $state.transitionTo('content',{},{}); break;
                }
            };

            $scope.changeLocale = function(lang){
                localStorage.setItem('local',lang);
                loc.setTranslation($scope);
                $state.transitionTo($state.current.name,{},{reload:true})
            }

            $scope.radioModel = localStorage.getItem('local');
    }]);