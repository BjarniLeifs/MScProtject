/* About rames info factory */
app.factory('categoryFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var category = {};
    var baseUrl = configFactory.getHttpUrl();


    category.getCategoryOrdSeq = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramescategory/ordered/sequenceNumber")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	category.getCategorybyID = function(id) {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/ramescategory/' + id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	}
    return category;
}]);