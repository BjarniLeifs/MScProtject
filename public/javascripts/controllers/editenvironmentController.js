'use strict';


app.controller('EditEnvironmentCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	 			'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory','reportInfoFactory',
	 			'growl',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, 
		ramesInfoFactory, questionFactory, choicesFactory, categoryFactory, reportInfoFactory, growl) {
		$scope.buttonNext = "Save & Next";
		$scope.buttonSave = "Save Information";
		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(4);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(4, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(4);
				$scope.category  = categoryFactory.getCategorybyID(4);
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
					$state.go('main.editreport.editsoftware');
				else
					growl.success("Information successfully saved.", config);
			}
		};
	}
]);