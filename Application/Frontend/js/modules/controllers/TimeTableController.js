/**
 * Created by Pavel on 3.3.14.
 */
angular.module('timetableBSU')
    .controller("TimeTableCtrl",[
        '$scope',
        '$timeout',
        '$state',
        'translation',
        'locStorage',
        function($scope,$timeout,$state,translation,storage){
            $scope.title = 'My title';
            //Can we use cache
            /*if(loc.getTranslation()){
                loc.setTranslation($scope);
                $scope.ready = true;
                $state.transitionTo('login',{},{});
                console.log('cash');
            } else{*/
                $timeout(function(){
                    translation.setTranslation($scope);
                    $scope.ready = true;
                    $state.transitionTo('login',{},{});
                },500);
            //}
            $scope.doClick = function(data){
                switch (data){
                    case 1: $state.transitionTo('login',{},{}); break;
                    case 2: $state.transitionTo('1course',{},{}); break;
                }
            };

            $scope.changeLocale = function(lang){
                storage.set('local',lang);
                translation.setTranslation($scope);
                $state.transitionTo($state.current.name,{},{reload:true,location:'replace'})
            };

            $scope.radioModel = storage.get('local');
    }]);