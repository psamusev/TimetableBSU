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
        'loginService',
        '$modal',
        function($scope,$timeout,$state,translation,storage,loginService,$modal){
            $scope.title = 'My title';
            $scope.registration = true;
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
                    case 1: $scope.registration = true; $state.transitionTo('login',{},{}); break;
                    case 2: if(loginService.isAuthorized()){
                                $scope.registration = false;
                                $state.transitionTo('1course',{},{});
                            } else {
                                alert('You are not authorized');
                            } break;
                }
            };

            $scope.changeLocale = function(lang){
                storage.set('local',lang);
                translation.setTranslation($scope);
                $state.transitionTo($state.current.name,{},{reload:true,location:'replace'})
            };

            $scope.doRegistration = function(){
                $modal.open({
                    templateUrl:'../Frontend/templates/modal/registration.html',
                    controller:function($scope,$modalInstance){
                        translation.setTranslation($scope);
                        $scope.groups = [1,2,3,4,5,6,7,8,9,10,11,12];
                        $scope.group = $scope.groups[0];
                        $scope.faculty = 'fpm';

                        $scope.ok = function(){
                            $modalInstance.dismiss('ok');
                        };
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    windowClass:'registration'
                })
            };

            $scope.radioModel = storage.get('local');
    }]);