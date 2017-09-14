/* About rames info factory */
app.factory('reportTypeFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var reportType = {};
    var baseUrl = configFactory.getHttpUrl();

    reportType.getAll = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reporttype")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	reportType.getById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl+ "/api/reporttype/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}

	reportType.add = function (toAdd) {
		var returnMe;
		$http
		 .post(baseUrl+'/api/reporttype', toAdd)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	reportType.update = function (object) {
		var returnMe;
		$http
		 .put(baseUrl+'/api/reporttype/', object)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	reportType.delete = function (id) {
		var returnMe;
		$http
		 .delete(baseUrl+'/api/reporttype/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};





    return reportType;
}]);