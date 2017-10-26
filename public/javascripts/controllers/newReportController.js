'use strict';
app.controller('NewReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				if ($stateParams.id != undefined) {
					$scope.projectId = $stateParams.id;
				}
				$scope.reportypes = reportTypeFactory.getAll();
			}, 110
		);

		$scope.data = {
    		typeSelect: null, // This one is the id of the selected 
    		multipleSelect: [],
    		option1: 'option-1'
   		};

 	  	$scope.makeNewReport = function () {
 			var data = {
 				Name : $scope.reportName,
 				ReportTypeID : $scope.data.typeSelect,
 				ProjectID : $stateParams.id
 			};
 			reportFactory.add(data);
 			$timeout(function () {
      			$state.go('main.project.overview',{'id' : $stateParams.id });
      		}, 110);
 		};
	}
]);