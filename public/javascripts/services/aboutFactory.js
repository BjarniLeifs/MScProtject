/* About rames info factory */
app.factory('aboutFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var about = {};
    var baseUrl = configFactory.getHttpUrl();

    about.getRamesInfo = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramesinfo")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	about.getRamesInfoByCategoryId = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramesinfo/category/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}
    return about;
}]);