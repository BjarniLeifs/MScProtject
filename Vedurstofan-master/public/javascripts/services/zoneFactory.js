 /* ZoneFactory */

app.factory('zone', ['$http', '$window', function ($http, $window) {
    var zone = {};
   
    /* Get requests */
    zone.getZone = function () {
        var returnMe = [];
        $http.get('/api/getZone').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    zone.getZoneById = function (id) {
        var returnMe = [];
        $http.get('/api/getZoneById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    zone.getZoneByName = function (name) {
        var returnMe = {};
        $http.get('/api/getZoneByName/'+name).success(function (data){
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    zone.addZone = function(object) {
        var returnMe = [];
        $http.post('/api/addZone',object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Put requerst */
    zone.updateZone = function (object) {
        var update = [];
        $http.put('/api/updateZone', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return zone;
}]);