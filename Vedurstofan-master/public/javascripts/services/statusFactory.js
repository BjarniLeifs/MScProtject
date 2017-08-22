/* StatusFactory */

app.factory('status', ['$http', '$window', function ($http, $window) {
    var status = {};
   
    /* Get request */
    status.getAllStatus = function () {
    	var returnMe = [];
    	$http.get('/api/getAllStatus').success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;
    };
    status.getStatusById = function (id) {
    	var returnMe = [];
    	$http.get('/api/getStatusById/'+id).success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;
    };
    /* Post request */
    status.addStatus = function (object) {
    	var added = [];
    	$http.post('/api/addStatus', object).success(function (data) {
    		angular.copy(data, added);
    	});
    	return added;
    };
    return status;
}]);