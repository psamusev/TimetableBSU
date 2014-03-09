/**
 * Created by Pavel on 3.3.14.
 */
angular.module("TimeTable.Login")
    .controller('LoginCtrl',[
        '$scope',
        '$state',
        'translation',
        '$modal',
        function($scope,$state,loc,$modal){
            loc.setTranslation($scope);
            $scope.username = '';
            $scope.password = '';

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