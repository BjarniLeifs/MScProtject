app.factory('stationitem', ['$http', '$window', function ($http, $window) {
    var stationitem = {};

	stationitem.addStationItem = function (object) {
    	return $http.post('/api/addStationItem', object).success(function (data) {
            var comment = {};
            angular.copy(comment, data);
            return comment;
        });
    };
    stationitem.updateStationItem = function (object) {
    	var update = [];
        $http.put('/api/updateStationItem', object).success(function (data) {
            angular.copy(data, update);
        });
        return update;
    };
    stationitem.getStationItem = function (ID) {
       var result =[];
        $http.get('/api/getStationItemById/' + ID).success(function (data) {
            
            angular.copy(data, result);
            
        });

        return result;     
    };
    stationitem.getStationItemHistory = function (ID) {
       var result =[];
        $http.get('/api/getStationItemHistory/' + ID).success(function (data) {
            
            angular.copy(data, result);
            
        });

        return result;     
    }
    return stationitem;
}]);