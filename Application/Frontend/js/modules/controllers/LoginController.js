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
            $scope.username = '';
            $scope.password = '';

            $scope.doLogin = function(){
                loginService.login({
                    username:$scope.username,
                    password:$scope.password
                }).then(function(auth){
                        alert('It is ok!!!');
                    },function(error){
                        alert(error.message);
                    })
            };

            $scope.doForgotPassword = function(){
                $modal.open({
                    templateUrl:'../Frontend/templates/modal/forgotPassword.html',
                    controller:function($scope,$modalInstance){
                        loc.setTranslation($scope);

                        $scope.ok = function(){
                            $modalInstance.dismiss('ok');
                        };
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    windowClass:'forgot-password'
                })
            }

    }]);