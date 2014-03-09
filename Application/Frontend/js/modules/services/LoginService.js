/**
 * Created by Pavel on 3.3.14.
 */
angular.module("TimeTable.Login")
    .factory('loginService',['locStorage',function(locStore){
        return{
            login:function(){
                locStore.set('auth','user:password');
            },
            logout:function(){
                locStore.remove('auth');
            },
            remindPassword:function(email){

            },
            registration: function(newUser){

            },
            isAuthorized: function(){
                return locStore.has('auth');
            }
        };
    }]);