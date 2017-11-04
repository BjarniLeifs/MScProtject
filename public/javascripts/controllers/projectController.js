'use strict';


app.controller('ProjectCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'projectFactory',
    'growl', 
	function ($scope, $state, $stateParams, $location, $timeout, projectFactory, growl) {
		$timeout(function() {
			$scope.projects = projectFactory.getProjectByUserId();
			if ($stateParams.id != undefined) {
				
				$scope.projectUpdate = projectFactory.getProjectById($stateParams.id);
				$scope.projectId = $stateParams.id;

			}
			
		},110);


        $scope.makeNewProject = function () {
            var config = {};
            projectFactory.createProject($scope.project)
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Project successfully created.", config);
                    $state.go('main.dashboard.overview');    
                }
            }, function (error) {
                if (error.status == 400)
                    growl.error("Something went wrong.",config);
            });
        };

        $scope.updateProject = function () {
        	var config = {};
            projectFactory.updateProject($scope.projectUpdate[0])
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Project updated.", config);
                    $state.go('main.dashboard.overview');    
                }
            }, function (error) {
                if (error.status == 400)
                    growl.error("Something went wrong.", config);
            });
        	
        };

        $scope.deleteProject = function() {
            var config = {};
        	projectFactory.deleteProject($stateParams.id)
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Successfully deleted project", config);
                    $state.go('main.dashboard.overview');
                }
            }, function (error) {
                if (error.status == 403)
                    growl.warning("This project is not yours.", config);
                else 
                    growl.error("Something went wrong.", config);
            });

        }
	}
]);

