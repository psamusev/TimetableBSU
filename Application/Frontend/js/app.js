/**
 * Created by Pavel on 1.3.14.
 */
'use strict';
angular.module('timetableBSU',[
        'ui.bootstrap',
        'ui.router',
        'ngRoute',
        'TimeTable.MainService',
        'TimeTable.Login',
        'TimeTable.Content',
        'TimeTable.FirstCourse',
        'TimeTable.SecondCourse'
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$routeProvider',
        function($stateProvider,$urlRouterProvider,$locationProvider,$routeProvider){

            $stateProvider
                .state({
                    name:'login',
                    url:'/login',
                    templateUrl:'../Frontend/templates/login.html',
                    controller:'LoginCtrl'
                })
                .state({
                    name:'content',
                    url:'/content',
                    templateUrl:'../Frontend/templates/content.html',
                    controller:'ContentCtrl',
                    abstract:true
                })
                .state({
                    name:'1course',
                    url:'/1course',
                    parent:'content',
                    template:'<p>{{translation.test1}}</p>',
                    controller:'FirstCourseCtrl'
                })
                .state({
                    name:'2course',
                    url:'/2course',
                    parent:'content',
                    template:'<p>{{translation.test2}}</p>',
                    controller:'SecondCourseCtrl'
                })
                .state({
                    name:'pageNotFound',
                    url:'/pageNotFound',
                    templateUrl:'../Frontend/templates/404.html'
                });

            $urlRouterProvider.otherwise('/pageNotFound');
    }])
    .run([
        'locStorage',
        'translation',
        '$rootScope',
        '$urlRouter',
        '$location',
        '$window',
        function(storage,loc,$rootScope,$urlRouter,$location,$window){
             loc.create();
             if(!storage.has('local')){
                storage.set('local','en-us');
             }
            $rootScope.$on('$locationChangeSuccess', function(evt) {
                evt.preventDefault();
                if($location.path().indexOf('content') >= 0){
                    alert('You are not authorized');
                    $location.path('/login').replace();
                }

        });

    }]);
angular.module('TimeTable.Login',['TimeTable.MainService']);
angular.module('TimeTable.MainService',[]);
angular.module('TimeTable.Content',[
        'TimeTable.MainService',
         'ui.router'
    ]);
angular.module('TimeTable.FirstCourse',['TimeTable.MainService']);
angular.module('TimeTable.SecondCourse',['TimeTable.MainService']);
