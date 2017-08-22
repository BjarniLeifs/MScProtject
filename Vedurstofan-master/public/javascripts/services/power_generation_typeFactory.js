 /* Power_Generation_Type Factory */


app.factory('power_generation_type', ['$http', '$window', function ($http, $window) {
    var power_generation_type = {};
   
    /* Get requests */
    power_generation_type.getPowerGenType = function () {
        var returnMe = [];
        $http.get('/api/getPowerGenType').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    power_generation_type.getPowerGenTypeById = function (id) {
        var returnMe = [];
        $http.get('/api/getPowerGenTypeById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    power_generation_type.getPowerGenTypeByName = function (name) {
        var returnMe = {};
        $http.get('/api/getPowerGenTypeByName/'+name).success(function (data){
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    power_generation_type.addPowerGenType = function(object) {
        var returnMe = [];
        $http.post('/api/addPowerGenType',object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
     /* Put requerst */
    power_generation_type.updatePowerGenType = function (object) {
        var update = [];
        $http.put('/api/updatePowerGenType', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return power_generation_type;
}]);