/* About rames info factory */
app.factory('projectFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var project = {};
    var baseUrl = configFactory.getHttpUrl();

/* This one had token in header in which will send the id with it. */
	project.getProjectByUserId = function() {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/project/')
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	};
/* This gets proect by id and is user token id*/
	project.getProjectById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/project/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	};

	project.createProject = function (project) {
		return $http.post(baseUrl+'/api/project', project);
	};

	project.updateProject = function (update) {
		return $http.put(baseUrl+'/api/project', update);
	};

	project.deleteProject = function (id) {
		return $http.delete(baseUrl+'/api/project/'+id);
	};

    return project;
}]);