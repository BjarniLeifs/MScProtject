/* About rames info factory */
app.factory('userFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var user = {};
    var baseUrl = configFactory.getHttpUrl();

    user.getUserById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramescategory/ordered/sequenceNumber")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}
    return user;
}]);