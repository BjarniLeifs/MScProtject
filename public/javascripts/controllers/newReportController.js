'use strict';
app.controller('NewReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory', 'growl',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory, growl) {

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
 			var config = {};
 			var data = {
 				Name : $scope.reportName,
 				ReportTypeID : $scope.data.typeSelect,
 				ProjectID : $stateParams.id
 			};
 			reportFactory.add(data)
 			.then(function (response) {
 				if (response.status == 200) {
 					growl.success("Successfully created plan.", config);
 					$state.go('main.editreport.editroles',{'reportid': response.data[0].ID, 'id' : $stateParams.id });	
 				}
 			}, function (error) {
 				if (error.status == 412 )
 					growl.error("Something went wrong.", config);
 			});

 		};
	}
]);