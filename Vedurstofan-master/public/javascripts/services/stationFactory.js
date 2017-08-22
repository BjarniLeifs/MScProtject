/* StationFactory*/

app.factory('station', ['$http', '$window', function ($http, $window) {
    var station = {};
   
    /* Get requests */
    station.getAllStations = function () {
    	var temp = [];
    	$http.get('/api/getAllStations').success(function (data) {
    		angular.copy(data, temp);
    	});
    	return temp;
    };
    station.getStationByID = function (id) {
        var result = [];
        $http.get('/api/getStationByID/'+id).success(function (data) {
            angular.copy(data, result);
        });
        console.log(result);
        return result;
    };
    station.getStationByName = function (name) {
        var returnMe = [];
        $http.get('/api/getStationByName/'+name).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    station.getStationByNameForUpdate = function (name) {
        var returnMe = {};
        $http.get('/api/getStationByNameForUpdate/'+name).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    station.addStation = function (object) {
        var added = [];
        $http.post('/api/addStation', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };

    /* Put requests */
    station.updateStation = function (object) {
        var update = [];
        $http.put('/api/updateStation', object).success(function (data) {
            angular.copy(update, data);
            console.log(update);
        });
        return update;
    };  
    station.isActive = function (object) {
        return $http.put('/api/updateIsActive', object).error(function (error) {
            $scope.error = error;
        });
    };
    station.addStationItem = function (object) {
        var added = [];
        $http.post('/api/addStation', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    return station;
}]);