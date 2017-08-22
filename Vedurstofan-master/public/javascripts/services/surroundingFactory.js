/* StationFactory*/

app.factory('surrounding', ['$http', '$window', function ($http, $window) {
    var surrounding = {};
   
    surrounding.getSurroundings = function () {
        var surroundings = [];
        $http.get('/api/getSurroundings').success(function (data) {
            angular.copy(data, surroundings);
        });
        return surroundings;
    };
    surrounding.getSurroundingById = function (id) {
        var getSur = [];
        $http.get('/api/getSurroundingById/'+id).success(function (data) {
            angular.copy(data, getSur);
        });
        return getSur;
    };
    surrounding.getSurroundingBySurroundings = function (surroundings) {
        var returnMe = {};
        $http.get('/api/getSurroundingBySurroundings/'+surroundings).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    surrounding.addSurrounding = function (object) {
        var added = [];
        $http.post('/api/addSurrounding', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    /* Put requerst */
    surrounding.updateSurroundings = function (object) {
        var update = [];
        $http.put('/api/updateSurrounding', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return surrounding;
}]);