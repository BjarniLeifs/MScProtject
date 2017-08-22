 /* AreaFactory*/

app.factory('area', ['$http', '$window', function ($http, $window) {
    var area = {};
    /* Get requests */
    area.getArea = function () {
        var returnMe = [];
        $http.get('/api/getArea').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    area.getAreaById = function (id) {
        var returnMe = [];
        $http.get('/api/getAreaById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    area.getAreaByArea = function (area) {
        var returnMe = {};
        $http.get('/api/getAreaByArea/'+area).success(function (data){
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    area.addArea = function(object) {
        var added = [];
        $http.post('/api/addArea',object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    /* Put requerst */
    area.updateArea = function (object) {
        var update = [];
        $http.put('/api/updateArea', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return area;
}]);