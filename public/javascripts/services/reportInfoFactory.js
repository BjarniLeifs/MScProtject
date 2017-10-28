/* About rames info factory */
app.factory('reportInfoFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var info = {};
    var baseUrl = configFactory.getHttpUrl();

    info.getByReportId = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reportsinfo/report/"+id)
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	info.getByCategoryIdAndReportId = function (cid, rid) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reportsinfo/category/"+cid+"/report/"+rid)
		  .success(function (data) {
			angular.copy(data, returnMe);
		});

		//return returnMe;
/*		return [ 
				{ ID: 1, ReportID: 1, CategoryID: 1, QuestionID: 1, Answer: { number: 2 } },
				{ ID: 2, ReportID: 1, CategoryID: 1, QuestionID: 2, Answer: {} },
				{ ID: 3, ReportID: 1, CategoryID: 1, QuestionID: 3, Answer: { text: "test 1"} },
				{ ID: 4, ReportID: 1, CategoryID: 1, QuestionID: 4, Answer: { yesno: "No"} },
				{ ID: 5, ReportID: 1, CategoryID: 1, QuestionID: 6, Answer: { number: 5 } },
				{ ID: 6, ReportID: 1, CategoryID: 1, QuestionID: 8, Answer: { text: "test 3"} },
				{ ID: 7, ReportID: 1, CategoryID: 1, QuestionID: 10, Answer: {} },
				{ ID: 8, ReportID: 1, CategoryID: 1, QuestionID: 14, Answer: { text: "test 4"} },
				{ ID: 9, ReportID: 1, CategoryID: 1, QuestionID: 12, Answer: {} },
				{ ID: 10, ReportID: 1, CategoryID: 1, QuestionID: 13, Answer: { text: "test 5"} },
				{ ID: 12, ReportID: 1, CategoryID: 1, QuestionID: 11, Answer: {number: 6 } },
				{ ID: 14, ReportID: 1, CategoryID: 1, QuestionID: 5, Answer: { text: "test 2"} },
				{ ID: 15, ReportID: 1, CategoryID: 1, QuestionID: 7, Answer: {} },
				{ ID: 16, ReportID: 1, CategoryID: 1, QuestionID: 9, Answer: { yesno: "Yes"} } 
				]

	return [ 
				{ ID: 11, ReportID: 1, CategoryID: 2, QuestionID: 16, Answer: { text: "Text 1" } },
				{ ID: 13, ReportID: 1, CategoryID: 2, QuestionID: 15, Answer: { radio: "Both"} },
				{ ID: 17, ReportID: 1, CategoryID: 2, QuestionID: 21, Answer: { text: "Text 3"} },
				{ ID: 24, ReportID: 1, CategoryID: 2, QuestionID: 17, Answer: { text: "Text 2"} },
				{ ID: 25, ReportID: 1, CategoryID: 2, QuestionID: 19, Answer: {} },
				{ ID: 29, ReportID: 1, CategoryID: 2, QuestionID: 22, Answer: { text: "Text 4"} },
				{ ID: 34, ReportID: 1, CategoryID: 2, QuestionID: 18, Answer: { number: 3} },
				{ ID: 35, ReportID: 1, CategoryID: 2, QuestionID: 20, Answer: { conditionalyesnotext: "Yes", Text: {conditionalyesnotext: " Peer review "}, Textbox: {conditionalyesnotext: " Tókst !!"}} }
			]*/
	return [ 
				{ ID: 18, ReportID: 1, CategoryID: 3, QuestionID: 25, Answer: {} },
				{ ID: 19, ReportID: 1, CategoryID: 3, QuestionID: 27, Answer: {} },
				{ ID: 23, ReportID: 1, CategoryID: 3, QuestionID: 29, Answer: {text: "test 3"} },
				{ ID: 27, ReportID: 1, CategoryID: 3, QuestionID: 23, Answer: {checkbox: {Text: "Tókst jeyj!", data: {0: "User tasks", 1: "Scenarios"}}} },
				{ ID: 28, ReportID: 1, CategoryID: 3, QuestionID: 26, Answer: {radio: "Qualitative"} },
				{ ID: 30, ReportID: 1, CategoryID: 3, QuestionID: 28, Answer: {text: "Test 2"} },
				{ ID: 36, ReportID: 1, CategoryID: 3, QuestionID: 24, Answer: {text: "test 1"} } 
				]
	}

	info.post = function (data) {
		var returnMe;
		$http.post(baseUrl + '/api/reportsinfo', data).success(function (data) {
			angular.copy(data, returnMe);
		})
		return returnMe;
	}
    return info;
}]);

