/**
 * Created by Pavel on 1.3.14.
 */
'use strict';
angular.module('timetableBSU',['ui.router',"ui.bootstrap"])
    .config(['$stateProvider',function($stateProvider){
        $stateProvider
            .state({
                name:'login',
                url:'/login',
                //views:{
                  //  'main':{
                        templateUrl:'templates/login.html'
                    //}
                //}
            })
            .state({
                name:'content',
                url:'/content',
                //views:{
                  //  'main':{
                        template:'<p>You are in content page</p>'
                    //}
                //}
            })
    }])
    .controller('TestCtrl',['$scope','$state','MyLocalization','$locale','$timeout',function($scope,$state,loc,$locale,$timeout){
        $scope.title = 'My title';
        $timeout(function(){
            changeLang();
            $scope.ready = true;
        },100);
        $scope.doClick = function(data){
            switch (data){
                case 1: $state.transitionTo('login',{},{}); break;
                case 2: $state.transitionTo('content',{},{}); break;
            }
        };
        $scope.changeLocale = function(lang){
            $locale.id = lang;
            changeLang();
        };

        $scope.radioModel = 'en';

        function changeLang(){
            $scope.firstName = loc.get('firstName');
            $scope.secondName = loc.get('secondName');
        }
    }])
    .service('MyLocalization',['$locale','getJson',function($locale,local){
        var data;
        local.getLocal().then(function(loc){
            data = loc;
        });

        return{
            get:function(key){
                return data[$locale.id][key];
            }
        }

    }])
    .service('getJson',['$q','$http',function($q,$http){
        var path = 'local.json';
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