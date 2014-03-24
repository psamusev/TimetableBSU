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
            $scope.registration = true;
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

            $scope.doClick = function(data){
                switch (data){
                    case 1: loginService.logout();/* $scope.registration = true;*/ navigation.stateNavigationTo('login',{},{}); break;
                    case 2: if(loginService.isAuthorized()){
                                /*$scope.registration = false;*/
                                navigation.stateNavigationTo('1course',{},{});
                            } else {
                                alert('You are not authorized');
                            } break;
                }
            };

            $scope.changeLocale = function(lang){
                storage.set('local',lang);
                translation.setTranslation($scope);
                navigation.reloadState();
            };

            $scope.doRegistration = function(){
                var registratonDialog = $modal.open({
                    templateUrl:'../Frontend/templates/modal/registration.html',
                    controller:function($scope,$modalInstance,$timeout){
                        translation.setTranslation($scope);
                        $scope.credentials = null;
                        $scope.name = $scope.surname = $scope.email = $scope.username = $scope.password = $scope.confirmPassword = '';
                        $scope.error = false;

                        $scope.groups = [1,2,3,4,5,6,7,8,9,10,11,12];
                        $scope.group = $scope.groups[0];
                        $scope.faculty = 'fpm';


                        $scope.ok = function(){

                            var newUser = {
                                name: this.name,
                                surname: this.surname,
                                faculty: this.faculty,
                                group: this.group,
                                username: this.username,
                                password: this.password,
                                confirmPassword: this.confirmPassword,
                                email: this.email
                            };
                            $scope.error = false;
                            var error = loginService.validateRegistrationData(newUser);
                            var inputs = angular.element(document.querySelectorAll('.registration .form-group'));

                            for(var i = 0; i < inputs.length; i++){
                                if(inputs[i].className.indexOf('has-error') >= 0){
                                    inputs[i].className =  inputs[i].className.replace(' has-error','');
                                }
                            }
                            if(error.length === 0){
                                var me = this;
                                loginService.registration(newUser)
                                    .then(function(){
                                        $timeout(function(){
                                            $modalInstance.close({username:me.username,password:me.password});
                                        },0);
                                    },function(error){
                                        alert(error.message);
                                    });



                            } else{
                                $scope.error = true;
                                for(var i = 0; i < error.length; i++){
                                    inputs[error[i]].className += ' has-error';
                                }
                            }


                        };
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        };
                    },
//                    resolve:{
//                        credentials:function(){
//                            return $scope.credentials;
//                        }
//                    },
                    windowClass:'registration'
                });

                registratonDialog.result
                    .then(function(credentials){
                        $scope.$$childHead.username = credentials.username;
                        $scope.$$childHead.password = credentials.password;
                    },function(){
                        var s = 5;
                    });
            };

            $scope.radioModel = storage.get('local');
    }]);