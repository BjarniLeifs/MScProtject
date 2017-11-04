'use strict';
app.controller('DeleteReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory', 'growl',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory, growl) {

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
 			var config = {};
 			reportFactory.delete($stateParams.reportid)
 			.then(function (response) {
 				if (response.status == 200) {
 					growl.success("Successfully deleted plan.", config);
 					$state.go('main.project.overview',{'id' : $stateParams.id });		
 				} else 
 					growl.warning("Something went wrong.", config);
 			}, function (error) {
 				if (error.status == 404)
 					growl.error("Something went wrong.", config);
 			});
 		
 		};

	}
]);