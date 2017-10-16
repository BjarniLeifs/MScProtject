'use strict';
app.controller('ReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'aboutFactory', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, aboutFactory, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				if ($stateParams.id != undefined) {
					$scope.projectId = $stateParams.id;
				}
				
				if ($stateParams.reportid != undefined) {
					$scope.report = reportFactory.getById($stateParams.reportid); // Get report info
				}
				// $scope.infos = aboutFactory.getRamesInfoByCategoryId(2); ?????
				$scope.reportypes = reportTypeFactory.getAll();
				$scope.reports = reportFactory.getAll();
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

   		$scope.deleteReport = function () {
   			reportFactory.delete($stateParams.reportid);
   			$timeout(function () {
        		$state.go('main.project.overview',{'id' : $stateParams.id });
        	}, 110);
   		};



















	}
]);