'use strict';


app.controller('EditActivityCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 'reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {
console.log($stateParams);
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
				/* Getting the radio button choices */
				/*
				$scope.questionFifteen    	= choicesFactory.getRadioByQuestionId(15);
				$scope.questionTwentySix  	= choicesFactory.getRadioByQuestionId(26);
				$scope.questionThirty  	  	= choicesFactory.getRadioByQuestionId(30);
				$scope.questionTwenty 		= choicesFactory.getDrowpdownByQuestionId(20);
				$scope.questionThirtyEight	= choicesFactory.getDrowpdownByQuestionId(38);

				$scope.questionTwentyThree	= choicesFactory.getCheckboxByQuestionId(23);
				$scope.questionTwentuFive	= choicesFactory.getCheckboxByQuestionId(25);
				$scope.questionTwentySeven 	= choicesFactory.getCheckboxByQuestionId(27);
				$scope.questionThirtyOne	= choicesFactory.getCheckboxByQuestionId(31);
				$scope.questionThirtySix	= choicesFactory.getCheckboxByQuestionId(36);
				$scope.questionThirtySeven	= choicesFactory.getCheckboxByQuestionId(37);
*/

			}, 100
		);

	$scope.answerValue = function (data, type, attribute, id) {
		if (angular.equals({}, data.Answer)) {
			if (type == 'num')
				return 0; 
			else
				return '';
		}
		else {
			if (type == 'num')
				return data.Answer.number;
			else if (type == 'text')
				return data.Answer.text;
			else if (type == 'yesno')
				return data.Answer.yesno;
			else if (type == 'radio')
				return data.Answer.radio;
			else if (type == 'conditionalyesnotext') {
				if (attribute == 'radio')
					return data.Answer.conditionalyesnotext;
				else if (attribute == 'Text') {
					if (angular.equals({}, data.Answer.Text))
						return '';
					else 
						return data.Answer.Text.conditionalyesnotext;
				}
				else if (attribute == 'Textbox') {
					if (angular.equals({}, data.Answer.Textbox))
						return '';
					else 
						return data.Answer.Textbox.conditionalyesnotext;
				}
			}
			else
				return {};
		}
	}


    $scope.reportInfo = {
      "ReportID": $stateParams.reportid,
    };


    $scope.resetValue = function(questionID) {
   		try {
   	 	 	$scope.reportInfo.Answer[questionID]['Text'] = '';
      		$scope.reportInfo.Answer[questionID]['Textbox'][Object.keys($scope.reportInfo.Answer[questionID]['Textbox'])] = '';
    	
   		} catch (err) {
   			
   		}
    };
    
    $scope.saveInfo = function(reportInfo) {
          var length = Object.keys(reportInfo['Answer']).length;
          var keys = Object.keys(reportInfo['Answer']);
          var reportid = $stateParams.reportid;
          for(var i = 0; i < length; i++) {
            //console.log(typeof(reportInfo['Answer'][keys[i]]));
            if(typeof(reportInfo['Answer'][keys[i]]) == 'object') {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
            //console.log(reportInfo['Answer'][keys[i]]);
             // console.log(keys[i]);
            } else {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
             // console.log(reportInfo['Answer']);
                           // console.log(reportInfo['Answer'][keys[i]]);
             
            };
            //console.log(answer)
            //console.log(reportInfo)
            //console.log("answer " + angular.toJson(newData));

            //reportInfoFactory.post(newData);
          }

  //        window.location.href = "#/reports/" + $scope.reportID;
        };
      

	}
]);