/**
 * Created by Pavel on 3.3.14.
 */
angular.module('TimeTable.MainService')
    .service('translation',[
        '$locale',
        'locStorage',
        '$http',
        function($locale,storage,$http){
            var me = this;

            this.create = function(){

                var path = '../Frontend/local.json';
                return $http.get(path).then(function (response) {
                            return response.data;
                });

            };

            this.set = function(location){
                me.data = location;
            };
            this.setTranslation = function($scope){
                $scope.translation = me.data[storage.get('local')];
            };
            /*this.getTranslation = function(){
                return (me.data)? me.data[storage.get('local')] : null;
            };*/

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
    })
    .factory('navigation',[
        '$location',
        '$state',
        function($location,$state){
            return{
                navigateTo:function(path){
                    console.groupCollapsed('Location navigation');
                    console.log(path);
                    console.groupEnd();
                    $location.path(path).replace();
                },
                getPath:function(){
                    return $location.path();
                },
                isEqualPath:function(value,oldPath){
                    if(value === ''){
                        var regExp =/(http|https):\/\/[a-z0-9:]+\/$/gi;
                        return regExp.test(oldPath);
                    }
                    return($location.path().indexOf(value)>=0);
                },
                stateNavigationTo:function(state,params,options){
                    console.groupCollapsed('State Navigation');
                    console.log(state);
                    console.groupEnd();
                    $state.transitionTo(state,params,options);
                },
                reloadState:function(){
                    $state.transitionTo($state.current.name,{},{reload:true,location:'replace'});
                }
            }
        }
    ]);