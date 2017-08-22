 /* Network Factory*/

app.factory('network', ['$http', '$window', function ($http, $window) {
    var network = {};
   
    /* Get requests */
    network.getNetwork = function () {
        var returnMe = [];
        $http.get('/api/getNetwork').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };

    /* Get requests */
    network.getAllNetwork = function () {
        var returnMe = [];
        $http.get('/api/getAllNetwork').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    network.getNetworkById = function (id) {
        var returnMe = [];
        $http.get('/api/getAreaById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    network.getNetworkByName = function (name) {
        var returnMe = {};
        $http.get('/api/getNetworkByName/'+name).success(function (data){
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post requests */
    network.addNetwork = function(object) {
        var added = [];
        $http.post('/api/addNetwork',object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    /* Put requerst */
    network.updateNetwork = function (object) {
        var update = [];
        $http.put('/api/updateNetwork', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    return network;
}]);