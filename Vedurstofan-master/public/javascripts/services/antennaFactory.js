 /* Antenna Factory */

app.factory('antenna', ['$http', '$window', function ($http, $window) {
    var antenna = {};
   
    /* Get requests */
    antenna.getAllAntenna = function () {
        var returnMe = [];
        $http.get('/api/getAllAntenna').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    antenna.getAntennaByName = function (name) {
        var returnMe = {};
        $http.get('/api/getAntennaByName/'+name).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    antenna.addAntenna = function(object) {
        var added = [];
        $http.post('/api/addAntenna',object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
     /* Put requerst */
    antenna.updateAntennaType = function (object) {
        var update = [];
        $http.put('/api/updateAntennaType', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    antenna.updateFilterAntenna = function (object) {
        var update = [];
        $http.put('/api/updateFilterAntenna', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return antenna;
}]);