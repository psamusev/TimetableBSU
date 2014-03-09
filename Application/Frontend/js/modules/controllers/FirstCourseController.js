/**
 * Created by Pavel on 4.3.14.
 */
angular.module('TimeTable.FirstCourse')
    .controller('FirstCourseCtrl',[
        '$scope',
        'translation',
        function($scope,loc){
            loc.setTranslation($scope);
        }
    ]);