'use strict';


app.controller('EditSoftwareCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	 			'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory','reportInfoFactory',
	 			'growl',

	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, 
		ramesInfoFactory, questionFactory, choicesFactory, categoryFactory, reportInfoFactory,
		growl) {

		$scope.buttonNext = "Finish";
		$scope.buttonSave = "Save Information";
		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(5);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(5, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(5);
				$scope.category  = categoryFactory.getCategorybyID(5);
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
				if (status === 'next') {
					growl.success("Information successfully saved.", config);
					$state.go('main.project.overview',{'id': $stateParams.id });
				}
				else
					growl.success("Information successfully saved.", config);
			}
		};
    }
      

]);