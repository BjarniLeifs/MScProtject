/* About rames info factory */
app.factory('configFactory', ['$http', '$window', function ($http, $window) {
    
    var config = {};
    var baseUrl = "http://localhost:3001";

    config.getHttpUrl = function () {
		return "http://localhost:3001";
	};




    return config;
}]);