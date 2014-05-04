angular.module("TimeTable.Content")
    .factory('scheduleService',['locStorage','$http','$q',function(locStore,$http,$q){
        return{
            getSchedule:function(){

                var deffer = $q.defer();
                var authToken = locStore.get('auth');

                $http({
                    url:'/schedule?token=' + authToken,
                    method:'GET',
                    headers:{
                        Accept:'application/json'
                    }
                }).success(function(response){
                    alert('It is working!!!!!!');
                    deffer.resolve(true);
                }).error(function(response){
                    deffer.reject({
                        message:response.error.message
                    });
                });

                return deffer.promise;
            }
        };
    }]);
