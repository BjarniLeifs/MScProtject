/* About rames info factory */
app.factory('ramesInfoFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var info = {};
    var baseUrl = configFactory.getHttpUrl();

    info.getAll = function () {
	 	var returnMe = [];
	    $http.get(baseUrl + "/api/ramesinfo")
	      .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
    }
    info.getByCategoryId = function (id) {
	 	var returnMe = [];
	    $http.get(baseUrl + "/api/ramesinfo/category/"+id)
	      .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
    }
    return info;
}]);