/**
 * Created by Pavel on 4.3.14.
 */
angular.module('TimeTable.SecondCourse')
    .controller('SecondCourseCtrl',[
        '$scope',
        'translation',
        function($scope,loc){
            loc.setTranslation($scope);
        }
    ]);