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
            },
            validateRegistrationData:function(value){
                var error = [];
                if(value.name === ''){ error.push(0);}
                if(value.surname === ''){ error.push(1);}
                if(value.password === ''){ error.push(5);}
                if(value.confirmPassword !== value.password) {error.push(6);}
                var regExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
                if(!regExp.test(value.email)){ error.push(7);}

                return error;
            }
        };
    }]);