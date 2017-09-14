'use strict';


app.controller('ProjectCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'projectFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, projectFactory) {
		$timeout(function() {
			$scope.projects = projectFactory.getProjectByUserId();
			if ($stateParams.id != undefined) {
				
				$scope.projectUpdate = projectFactory.getProjectById($stateParams.id);
				$scope.projectId = $stateParams.id;

			}
			
		},110);


        $scope.makeNewProject = function () {
            
            projectFactory.createProject($scope.project);
      
            $timeout(function () {
                $state.go('main.dashboard.overview');
            }, 110);
        };

        $scope.updateProject = function () {
        	projectFactory.updateProject($scope.projectUpdate[0]);
        	
        	$timeout(function () {
        		$state.go('main.dashboard.overview');
        	}, 110);
        };

        $scope.deleteProject = function() {
        	projectFactory.deleteProject($stateParams.id);
        	$timeout(function () {
        		$state.go('main.dashboard.overview');
        	}, 110);
        }
	}
]);

