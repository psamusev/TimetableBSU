/**
 * Created by Pavel on 3.3.14.
 */
angular.module("TimeTable.Login")
    .factory('loginService',['locStorage','$http','$q',function(locStore,$http,$q){
        return{
            login:function(credentials){

                var deffer = $q.defer();

                $http({
                    url:'/login/authentication',
                    method:'POST',
                    headers:{
                        Accept:'application/json'
                    },
                    data:{
                        username:credentials.username,
                        password:credentials.password
                    }
                }).success(function(response){
                        alert('It is working!!!!!!');
                        locStore.set('auth',response.username);
                        deffer.resolve(true);
                    }).error(function(response){
                        deffer.reject({
                            message:response.error
                        });
                    });

                return deffer.promise;
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