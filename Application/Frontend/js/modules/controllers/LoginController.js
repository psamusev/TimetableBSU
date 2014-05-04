/**
 * Created by Pavel on 3.3.14.
 */
angular.module("TimeTable.Login")
    .controller('LoginCtrl',[
        '$scope',
        'navigation',
        'translation',
        '$modal',
        'loginService',
        function($scope,navigation,loc,$modal,loginService){
            loc.setTranslation($scope);
            $scope.$parent.registActive = true;
            $scope.username = '';
            $scope.password = '';


            $scope.doLogin = function(){
                loginService.login({
                    username:$scope.username,
                    password:$scope.password
                }).then(function(){
                        navigation.stateNavigationTo('content',{c:'firstCourse'},{location:'replace'});
                    },function(error){
                        alert(error.message);
                    })
            };

            $scope.doForgotPassword = function(){
                $modal.open({
                    templateUrl:'../Frontend/templates/modal/forgotPassword.html',
                    controller:function($scope,$modalInstance){
                        loc.setTranslation($scope);
                        $scope.email = '';
                        $scope.error = '';
                        $scope.ok = function(){
                            loginService.remindPassword(this.email)
                                .then(function(){
                                    $modalInstance.dismiss('ok');
                                },function(error){
                                    $scope.error = error.message;
                                });
                        };
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    windowClass:'forgot-password'
                })
            }


    }]);