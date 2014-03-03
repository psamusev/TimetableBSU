/**
 * Created by Pavel on 1.3.14.
 */
'use strict';
angular.module('timetableBSU',[
        'ui.router',
        "ui.bootstrap",
        "TimeTable.Login",
        "TimeTable.MainService"
    ])
    .config(['$stateProvider',function($stateProvider){
        if(!localStorage.getItem('local')){
            localStorage.setItem('local','en-us');
        }
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
                template:'<p>You are in content page</p>'
            });
    }]);
angular.module("TimeTable.Login",['TimeTable.MainService']);
angular.module('TimeTable.MainService',[]);
