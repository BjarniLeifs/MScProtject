/* About rames info factory */
app.factory('choicesFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
		var choice = {};
		var baseUrl = configFactory.getHttpUrl();

		choice.getRadioByQuestionId = function (qid) {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questionradiochoices/question/"+qid)
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		choice.getRadio = function () {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questionradiochoices")
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		
		choice.getDrowpdownByQuestionId = function (qid) {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questiondropdownchoices/question/"+qid)
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		choice.getDrowpdown = function () {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questiondropdownchoices")
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		choice.getCheckboxByQuestionId = function (qid) {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questioncheckboxchoices/question/"+qid)
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		choice.getCheckbox = function () {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/questioncheckboxchoices")
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		return choice;
	}
]);