'use strict';
app.controller('PlanCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'aboutFactory', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, aboutFactory, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				if ($stateParams.id != undefined) {
					$scope.projectId = $stateParams.id;
				}
				
				if ($stateParams.planid != undefined) {
					$scope.plan = reportFactory.getById($stateParams.planid); // Get report info
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
   				Name : $scope.planName,
   				ReportTypeID : $scope.data.typeSelect,
   				ProjectID : $stateParams.id
   			};
   			reportFactory.add(data);
   			$timeout(function () {
        		//$state.go('main.management.reporttype');
        	}, 110);
   		};

   		$scope.deleteReport = function () {
   			
   			reportFactory.delete($stateParams.planid);
   			$timeout(function () {
        		$state.go('main.project.overview',{'id' : $stateParams.planid });
        	}, 110);
   		};



















	}
]);