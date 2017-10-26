'use strict';
app.controller('EditReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'questionFactory', 'categoryFactory', 'ramesInfoFactory', 'questionFactory',
	'choicesFactory', 'categoryFactory', 'reportInfoFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, questionFactory, categoryFactory, ramesInfoFactory,
	 questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {
		
		$timeout(
			function() {
				if ($stateParams.id != undefined)
					$scope.projectId = $stateParams.id;
				if ($stateParams.reportid != undefined)
					$scope.reportId = $stateParams.reportid

				//$scope.questions 		  	= questionFactory.getQuestions();
				//$scope.categoryordSEg 	  	= categoryFactory.getCategoryOrdSeq();
				/* Getting the Answers */
			//	$scope.reportypes = reportTypeFactory.getAll();
			//	$scope.reports = reportFactory.getAll();
			}, 110
		);
	}
]);
