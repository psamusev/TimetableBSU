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
                while(me.data[storage.get('local')] === undefined){}
                $scope.translation = me.data[storage.get('local')];
            };
            /*this.getTranslation = function(){
                return (me.data)? me.data[storage.get('local')] : null;
            };*/

        }
    ])
    .service('locStorage',[
        function(){
            var storage = (typeof window.localStorage == 'unknown') ? window.sessionStorage : window.localStorage ;
            this.set = function(key,value){
                    storage.setItem(key,value);
            };
            this.get = function(key){
                return storage.getItem(key);
            };
            this.has = function(key){
                return(storage.getItem(key)) ? true : false;
            };
            this.remove = function(key){
                storage.removeItem(key);
            }
        }
    ])
    .factory('navigation',[
        '$location',
        '$state',
        '$stateParams',
        function($location,$state,$stateParams){
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
                },
                getStateParams:function(){
                    return $stateParams;
                },
                go:function(state){
                    $state.go(state);
                }
            }
        }
    ]);