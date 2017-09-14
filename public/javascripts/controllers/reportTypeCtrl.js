'use strict';

app.controller('ReportTypeCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'reportTypeFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, reportTypeFactory) {

	    $timeout(
			function() {
				$scope.reporttypes = reportTypeFactory.getAll();
				if ($stateParams.id != undefined) {
					$scope.reporttype = reportTypeFactory.getById($stateParams.id)
				}
			}, 200
		);  
 

	    $scope.makeNewType = function () {
	    	reportTypeFactory.add($scope.type);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };

	    $scope.updateReportType = function () {
	    	reportTypeFactory.update($scope.reporttype[0]);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };

	    $scope.deleteReporttype = function() {
	    	reportTypeFactory.delete($stateParams.id);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };
	}
]);
