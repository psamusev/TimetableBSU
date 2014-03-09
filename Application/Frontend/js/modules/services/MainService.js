/**
 * Created by Pavel on 3.3.14.
 */
angular.module('TimeTable.MainService')
    .service('translation',[
        '$locale',
        'getJson',
        'locStorage',
        function($locale,local,storage){
            var me = this;

            this.create = function(){
                local.getLocal().then(function(loc){
                    me.data = loc.d;
                });
            };
            this.setTranslation = function($scope){
                $scope.translation = me.data[storage.get('local')];
            };
            /*this.getTranslation = function(){
                return (me.data)? me.data[storage.get('local')] : null;
            };*/

        }
    ])
    .factory('getJson',[
        '$http',
        function($http){
            var path = '../Frontend/local.json';
            return{
                getLocal: function(){
                    return $http.get(path).then(function (response) {
                        return response.data;
                    });
                }
            }
        }
    ])
    .factory('locStorage',
        function(){
            var storage = window.localStorage;
            return{
                set:function(key,value){
                    storage.setItem(key,value);
                },
                get:function(key){
                    return storage.getItem(key);
                },
                has:function(key){
                    return(storage.getItem(key)) ? true : false;
                }
            }
    });