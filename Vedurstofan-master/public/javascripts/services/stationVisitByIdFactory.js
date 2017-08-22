/* Station Visit factory */ 
app.factory('stationVisitById', ['$http', '$window', function ($http, $window) {
    var stationVisitsById = {};

    stationVisitsById.getStationVisitById = function (id) {
        var returnMe = [];
        $http.get('/api/getStationVisitById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    stationVisitsById.getStationVisitByStationId = function (id) {
        var returnMe = [];
        $http.get('/api/getStationVisitByStationId/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    return stationVisitsById;
}]);