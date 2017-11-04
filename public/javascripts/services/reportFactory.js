/* About rames info factory */
app.factory('reportFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var report = {};
    var baseUrl = configFactory.getHttpUrl();

    report.getReportByProjectId = function (pid) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reports/project/"+pid)
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
		return $http.post(baseUrl+'/api/reports', toAdd);
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
		return $http.delete(baseUrl+'/api/reports/'+id);
	};





    return report;
}]);