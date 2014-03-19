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
        function($stateProvider,$urlRouterProvider){

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
        '$rootScope',
        'navigation',
        'loginService',
        function(storage,$rootScope,navigation,loginService){
            if(!storage.has('local')){
                storage.set('local','en-us');
            }
            $rootScope.$on('$locationChangeSuccess', function(evt,oldPath) {
                evt.preventDefault();
                if(navigation.isEqualPath('content') && !loginService.isAuthorized()){
                    alert('You are not authorized');
                    navigation.navigateTo('/login');
                } else if(navigation.isEqualPath('',oldPath)){
                    navigation.navigateTo('login');
                } else if(navigation.isEqualPath('/login') && loginService.isAuthorized()){
                    navigation.navigateTo('/content/2course');
                }

        });

    }]);
angular.module('TimeTable.Login',['TimeTable.MainService','ui.bootstrap']);
angular.module('TimeTable.MainService',[]);
angular.module('TimeTable.Content',[
        'TimeTable.MainService',
        'TimeTable.Login'
    ]);
angular.module('TimeTable.FirstCourse',['TimeTable.MainService']);
angular.module('TimeTable.SecondCourse',['TimeTable.MainService']);
