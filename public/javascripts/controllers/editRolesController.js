'use strict';
app.controller('EditRolesCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 
				 'reportInfoFactory', 'growl',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory, growl) {
		$scope.buttonNext = "Save & Next";
		$scope.buttonSave = "Save Information";
		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(1);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(1, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(1);
				$scope.category  = categoryFactory.getCategorybyID(1);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();

			}, 100
		);

		$scope.saveInfo = function(status) {
			var config = {};
			var error = false;

			
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
					$state.go('main.editreport.editactivity');
				else
					growl.success("Information successfully saved.", config);
			}
		};
	}
]);