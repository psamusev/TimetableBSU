/**
 * Created by Pavel on 3.3.14.
 */
angular.module("TimeTable.Login")
    .controller('LoginCtrl',[
        '$scope',
        '$state',
        'translation',
        function($scope,$state,loc){
            loc.setTranslation($scope);

    }]);