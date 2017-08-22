/* Station Comment factory */ 

app.factory('stationComments', ['$http', '$window', function ($http, $window) {
    var stationComment = {};
   
    /* Get request */
    stationComment.getAllStationComments = function () {
    	var returnMe = [];
    	$http.get('/api/getAllStationComments').success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;
    };
    stationComment.getStationCommentById = function (id) {
    	var returnMe = [];
    	$http.get('/api/getStationCommentById/'+id).success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;
    };
    stationComment.getStationCommentByStationId = function (id) {
        var returnMe = [];
        $http.get('/api/getStationCommentByStationId/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    stationComment.getStationCommentByUserId = function (id) {
        var returnMe = [];
        $http.get('/api/getStationCommentByUserId/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post request */
    stationComment.addStationComments = function (object) {
    	
    	return $http.post('/api/addStationComments', object).success(function (data) {
            var added = [];
    		angular.copy(data, added);
            return added;
    	});
        
    };
    return stationComment;
}]);