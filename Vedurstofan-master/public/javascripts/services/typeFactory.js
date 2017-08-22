/* TypeFactory */

app.factory('type', ['$http', '$window', function ($http, $window) {
    var type = {};
   
    /* Get request */
    type.getAllType = function () {
        var returnMe = [];
        $http.get('/api/getAllType').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    type.getTypeById = function (id) {
        var returnMe = {};
        $http.get('/api/getTypeById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    type.getTypeByName = function (name) {
        var returnMe = [];
        $http.get('/api/getTypeByName/'+name).success(function (data){
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    type.getTypeByDescription = function (description) {
        var returnMe = [];
        $http.get('/api/getTypeByDescription/'+description).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post request */
    type.addType = function (object) {
        var added = [];
        $http.post('/api/addType', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
     /* Put requerst */
    type.updateType = function (object) {
        var update = [];
        $http.put('/api/updateType', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return type;
}]);