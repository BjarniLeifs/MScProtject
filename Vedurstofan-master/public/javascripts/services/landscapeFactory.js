/* Landscape Factory*/

app.factory('landscape', ['$http', '$window', function ($http, $window) {
    var landscape = {};
   
    /* Get requests */
    landscape.getAllLandscape = function () {
        var returnMe = [];
        $http.get('/api/getAllLandscape').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    landscape.getLandscapeById = function (id) {
        var returnMe = [];
        $http.get('/api/getLandscapeById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    landscape.getLandscapeByLandscape = function(landscape) {
        var returnMe = {};
        $http.get('/api/getLandscapeByLandscape/'+landscape).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    landscape.addLandscape = function (object) {
        var added = [];
        $http.post('/api/addLandscape', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    /* Put requerst */
    landscape.updateLandscape = function (object) {
        var update = [];
        $http.put('/api/updateLandscape', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return landscape;
}]);