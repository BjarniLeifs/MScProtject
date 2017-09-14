/* About rames info factory */
app.factory('reportFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var report = {};
    var baseUrl = configFactory.getHttpUrl();

    report.getAll = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reports")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	report.getById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl+ "/api/reports/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}

	report.add = function (toAdd) {
		console.log(toAdd);
		var returnMe;
		$http
		 .post(baseUrl+'/api/reports', toAdd)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	report.update = function (object) {
		var returnMe;
		$http
		 .put(baseUrl+'/api/reports/', object)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	report.delete = function (id) {
		var returnMe;
		$http
		 .delete(baseUrl+'/api/reports/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};





    return report;
}]);