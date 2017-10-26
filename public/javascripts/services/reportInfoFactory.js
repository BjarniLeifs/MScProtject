/* About rames info factory */
app.factory('reportInfoFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var info = {};
    var baseUrl = configFactory.getHttpUrl();

    info.getByReportId = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reportsinfo/report/"+id)
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	info.getByCategoryIdAndReportId = function (cid, rid) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reportsinfo/category/"+cid+"/report/"+rid)
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	info.post = function (data) {
		var returnMe;
		$http.post(baseUrl + '/api/reportsinfo', data).success(function (data) {
			angular.copy(data, returnMe);
		})
		return returnMe;
	}
    return info;
}]);

