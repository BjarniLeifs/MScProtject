/* About rames info factory */
app.factory('questionFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
		var question = {};
		var baseUrl = configFactory.getHttpUrl();
		question.getAll = function () {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/ramesquestion/")
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}

		question.getQuestionsByCategoryId = function (qid) {
			var returnMe = [];
			$http
			 .get(baseUrl + "/api/ramesquestion/category/"+qid)
			  .success(function (data) {
				angular.copy(data, returnMe);
			});
			return returnMe;
		}
		return question;
	}
]);