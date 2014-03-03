/**
 * Created by Pavel on 3.3.14.
 */
angular.module('TimeTable.MainService')
    .service('TranslationService',[
        '$locale',
        'getJson',
        function($locale,local){
            var me = this;

            this.create = function(){
                local.getLocal().then(function(loc){
                    me.data = loc;
                });
            }
            this.setTranslation = function($scope){
                $scope.translation = me.data[localStorage.getItem('local')];
            }

        }])
    .factory('getJson',[
        '$q',
        '$http',
        function($q,$http){
            var path = '../Frontend/local.json';
            return{
                getLocal: function(){
                    var def = $q.defer();
                    $http.get(path).success(function(responce){
                        def.resolve(responce.d);
                    }).error(function(){
                            def.resolve(false)
                        });
                    return def.promise;
                }
            }
    }]);