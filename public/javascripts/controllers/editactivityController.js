'use strict';


app.controller('EditActivityCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 'reportInfoFactory',
				 'growl',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory, growl) {
		$scope.buttonNext = "Save & Next";
		$scope.buttonSave = "Save Information";
		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(2);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(2, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(2);
				$scope.category  = categoryFactory.getCategorybyID(2);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();
				$scope.isCollapsed = false;				


			}, 100
		);

		$scope.saveInfo = function(status) {
			var config = {};
			var error = false;
			console.log(status)
			
			angular.forEach($scope.answers, function(value, key) {
				reportInfoFactory.post(value).then(function (data) {
					if (data.status != 200)
						error = true;
				});
			})
			if (error)
				growl.error("Something went wrong, please try again later.", config); // info warning error sucess
			else {
				if (status === 'next')
					$state.go('main.editreport.editmaterial');
				else
					growl.success("Information successfully saved.", config);
			}
		};
	}
]);


