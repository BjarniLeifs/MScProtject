'use strict';
app.controller('ReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				// $scope.infos = aboutFactory.getRamesInfoByCategoryId(2); ?????
				$scope.reports = reportFactory.getAll();
				$scope.projectid = $stateParams.id;
				console.log($stateParams.id);
			}, 110
		);
	}
]);
