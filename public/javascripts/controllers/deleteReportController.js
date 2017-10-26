'use strict';
app.controller('DeleteReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				if ($stateParams.id != undefined) {
					$scope.projectId = $stateParams.id;
				}
				
				if ($stateParams.reportid != undefined) {
					$scope.report = reportFactory.getById($stateParams.reportid); // Get report info
				}
				$scope.reportypes = reportTypeFactory.getAll();
			}, 110
		);

 		$scope.deleteReport = function () {
 			reportFactory.delete($stateParams.reportid);
 			$timeout(function () {
      		$state.go('main.project.overview',{'id' : $stateParams.id });
      	}, 110);
 		};

	}
]);