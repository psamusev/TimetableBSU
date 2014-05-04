/**
 * Created by Pavel on 3.3.14.
 */
angular.module('timetableBSU')
    .controller("TimeTableCtrl",[
        '$scope',
        '$timeout',
        'navigation',
        'translation',
        'locStorage',
        'loginService',
        '$modal',
        function($scope,$timeout,navigation,translation,storage,loginService,$modal){
            $scope.title = 'My title';
            $scope.registActive = true;
            // TODO: Can we use cache for loc.Translation()
            translation.create().then(function(data){
                translation.set(data.d);
                translation.setTranslation($scope);
                $scope.ready = true;
                if(loginService.isAuthorized()){
                    //navigation.stateNavigationTo('1course',{},{location:'replace'});
                } else{
                    navigation.stateNavigationTo('login',{},{});
                }
            });

            $scope.changeLocale = function(lang){
                storage.set('local',lang);
                translation.setTranslation($scope);
                navigation.reloadState();
            };

            $scope.doRegistration = function(){
                var registrationDialog = $modal.open({
                    templateUrl:'../Frontend/templates/modal/registration.html',
                    controller:function($scope,$modalInstance,$timeout){
                        translation.setTranslation($scope);
                        $scope.credentials = null;
                        $scope.name = $scope.surname = /*$scope.email =*/ $scope.username = $scope.password = $scope.confirmPassword = '';
                        $scope.error = '';

                        $scope.groups = [1,2,3,4,5,6,7,8,9,10,11,12];
                        $scope.courses = [1,2,3,4,5];
                        $scope.course = $scope.courses[0];
                        $scope.group = $scope.groups[0];
                        $scope.faculty = 'fpm';


                        $scope.ok = function(){

                            var newUser = {
                                name: this.name,
                                surname: this.surname,
                                faculty: this.faculty,
                                course:this.course,
                                group: this.group,
                                username: this.username,
                                password: this.password,
                                confirmPassword: this.confirmPassword//,
                                /*email: this.email*/
                            };
                            var me = this;

                            loginService.registration(newUser)
                                .then(function(){
                                    $timeout(function(){
                                        $modalInstance.close({username:me.username,password:me.password});
                                    },0);
                                },function(error){
                                    $scope.error = error.message;
                                });
                        };
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    windowClass:'registration'
                });

                registrationDialog.result
                    .then(function(credentials){
                        $scope.$$childHead.username = credentials.username;
                        $scope.$$childHead.password = credentials.password;
                    },function(){
                    });
            };

            $scope.radioModel = storage.get('local');
    }]);