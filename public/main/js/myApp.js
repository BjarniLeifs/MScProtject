/*! Made on 28-10-2017 */
/* Angular routing and app declatation */

var app = angular.module('ramesApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
		$stateProvider
/* Main content starts*/
		.state('main', {
			url: '/main',
			templateUrl: 'views/main.html',
			controller: 'AuthCtrl',
		})
	/* About content starts */
		.state('main.about', {
			url: '/about',
			templateUrl: 'views/about/about.html',
			controller: 'AboutCtrl',
		})
		.state('main.about.picture', {
			url: '/picture',
			templateUrl: 'views/ramesInfo/picture.html',
			controller: 'AboutCtrl',
		})
		.state('main.about.roles', {
			url: '/info/roles',
			templateUrl: 'views/ramesInfo/info.html',
			controller: 'RamesRolesCtrl',
		})
		.state('main.about.activites', {
			url: '/info/activites',
			templateUrl: 'views/ramesInfo/info.html',
			controller: 'RamesActiviteCtrl',
		})
		.state('main.about.material', {
			url: '/info/material',
			templateUrl: 'views/ramesInfo/info.html',
			controller: 'RamesMaterialCtrl',
		})
		.state('main.about.environment', {
			url: '/info/environment',
			templateUrl: 'views/ramesInfo/info.html',
			controller: 'RamesEnvironmentCtrl',
		})
		.state('main.about.software', {
			url: '/info/software',
			templateUrl: 'views/ramesInfo/info.html',
			controller: 'RamesSoftwareCtrl',
		})
	/* Contributer content starts */
		.state('main.aboutcreator', {
			url: '/aboutcreator',
			templateUrl: 'views/about/aboutcreator.html',
			controller: 'AboutCreatorCtrl',
		})
	/* Dashboard content starts */
		.state('main.dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
		})
		.state('main.dashboard.overview', {
			url: '/overview',
			templateUrl: 'views/dashboard/overview.html',
			controller: 'ProjectCtrl',
		})
		.state('main.dashboard.newproject', {
			url: '/newproject',
			templateUrl: 'views/dashboard/newproject.html',
			controller: 'ProjectCtrl',
		})
		.state('main.dashboard.edit', {
			url: '/edit/project/:id',
			templateUrl: 'views/dashboard/editproject.html',
			controller: 'ProjectCtrl',
		})
		.state('main.dashboard.delete', {
			url: '/delete/project/:id',
			templateUrl: 'views/dashboard/deleteproject.html',
			controller: 'ProjectCtrl',
		})
	/* Project conent starts */
	/*
	*
	*
	*
	*/
		.state('main.project', {
			url: '/project/:id',
			templateUrl: 'views/projectoverview/project.html',
			controller: 'ProjectCtrl',
		})
		.state('main.project.overview', {
			url: '/overview',
			templateUrl: 'views/projectoverview/overview.html',
			controller: 'ReportCtrl',
		})
		.state('main.project.newreport', {
			url: '/newreport',
			templateUrl: 'views/projectoverview/newreport.html',
			controller: 'NewReportCtrl',
		})
		.state('main.project.deletereport', {
			url: '/delete/report/:reportid',
			templateUrl: 'views/projectoverview/deletereport.html',
			controller: 'DeleteReportCtrl',
		})
		.state('main.editreport', {
			url: '/edit/project/:id/report/:reportid',
			templateUrl: 'views/projectoverview/editreport.html',
			controller: 'EditReportCtrl',
		})
		.state('main.editreport.editroles', {
			url: '/roles',
			templateUrl: 'views/projectoverview/editreportattribute.html',
			controller: 'EditRolesCtrl'
		})
		.state('main.editreport.editactivity', {
			url: '/activities',
			templateUrl: 'views/projectoverview/editreportattribute.html',
			controller: 'EditActivityCtrl'
		})
		.state('main.editreport.editmaterial', {
			url: '/material',
			templateUrl: 'views/projectoverview/editreportattribute.html',
			controller: 'EditMaterialCtrl'
		})
		.state('main.editreport.editenvironment', {
			url: '/environment',
			templateUrl: 'views/projectoverview/editreportattribute.html',
			controller: 'EditEnvironmentCtrl'
		})
		.state('main.editreport.editsoftware', {
			url: '/software',
			templateUrl: 'views/projectoverview/editreportattribute.html',
			controller: 'EditSoftwareCtrl'
		})

	/*
	*
	*
	*
	*
	*/
	/* Single page purpose starts */
		.state('main.contactus', {
			url: '/contactus',
			templateUrl: 'views/contact/contactus.html',
			controller: 'ContractUsCtrl',
		})
		.state('main.login', {
			url: '/login',
			templateUrl: 'views/authentication/login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'authFactory', function ($state, authFactory) {
				if (authFactory.isLoggedIn()) {
					$state.go('main'); //This is where to go html state. 
				}
			}]
		})
		.state('main.register', {
			url: '/register',
			templateUrl: 'views/authentication/register.html',
			controller: 'AuthCtrl',
		})
		.state('main.error', {
			url: '/notfound',
			templateUrl: 'views/error.html',
			controller: 'ErrorCtrl',
		})
	/* Management conent starts*/
		.state('main.management', {
			url: '/management',
			templateUrl: 'views/management/index.html',
			controller: 'ManagementCtrl',
		})
		.state('main.management.reporttype', {
			url: '/reporttype',
			templateUrl: 'views/management/reporttype/overview.html',
			controller: 'ReportTypeCtrl',
		})
		.state('main.management.newreportype', {
			url: '/newreporttype',
			templateUrl: 'views/management/reporttype/newreporttype.html',
			controller: 'ReportTypeCtrl',
		})
		.state('main.management.editreporttype', {
			url: '/edit/reporttype/:id',
			templateUrl: 'views/management/reporttype/editreporttype.html',
			controller: 'ReportTypeCtrl',
		})
		.state('main.management.deletereporttype', {
			url: '/delete/reporttype/:id',
			templateUrl: 'views/management/reporttype/deletereporttype.html',
			controller: 'ReportTypeCtrl',
		});













		$urlRouterProvider.otherwise('main');

	}
]);
'use strict';

app.controller('AboutCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 'categoryFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, categoryFactory) {

	    $timeout(
			function() {
				$scope.categories = categoryFactory.getCategoryOrdSeq();
			}, 200
		);  

		$timeout(
			function() {
				$scope.ramesinfo = aboutFactory.getRamesInfo();
			}, 200
		);

	}
]);


'use strict';


app.controller('AboutCreatorCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {

	}
]);

/* AuthController */

app.controller('AuthCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'authFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, authFactory) {
        $scope.newUser = {};
		$scope.loginUser = {};
		$scope.isLoggedIn = authFactory.isLoggedIn();
		$scope.user = {};
		$scope.currentName = authFactory.currentName();
		$scope.register = function () {
			if ($scope.password === $scope.confirmPassword) {
				var registerObject = {
					username 		: $scope.newUser.username,
					password 		: $scope.newUser.password,
					confirmPassword : $scope.newUser.confirmPassword,
					name 			: $scope.newUser.firstName + ' ' + $scope.newUser.lastName,
					email 			: $scope.newUser.email
				};
				$timeout(
					function() {
						authFactory.register(registerObject)
						$state.go('main', {}, {reload: true});		
					}, 110
				);
				
			} else {
				$scope.error = "The passwords did not match!";

			}
			$scope.newUser = {};
		};

		$scope.login = function () {
			if ($scope.loginUser.username && $scope.loginUser.password) {
				var loginObject = {
					username : $scope.loginUser.username,
					password : $scope.loginUser.password
				};
				$timeout(
					function() {
						authFactory.logIn(loginObject)
						$scope.isLoggedIn = authFactory.isLoggedIn();	
						$state.go('main', {}, {reload: true});		
					}, 110
				);
				
				$scope.loginUser = {};

			} else {
				$scope.error = "You need to provide username and login!";
			}
			
	
		};
	
		$scope.logout = function () {
			authFactory.logOut();
			$scope.isLoggedIn = authFactory.isLoggedIn();
			$state.go('main');
		};


	}
]);
'use strict';


app.controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {

	}
]);

'use strict';


app.controller('ContractUsCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {
		/* Header of contact us site.*/
		$scope.Title = {
			ContactUs: "Contact us",
		 	ContactUsSmall: "Feel free to contact us"
		 };
		/* Our office part, information on name address and so forth.*/
		
		$scope.Company = {
			Title: "Our office",
			Name: "Reykjavik University.",
			Department: "School of Computer Science",
			Address: "Menntavegur 1, 101 Reykjavík, Iceland",
			Phone: {
				Name: "Tel:",
				Number: "+354-5996200"
			},
			Contact: {
				Name: "Dr. Marta Kristín Lárusdóttir",
				Email: "marta@ru.is",
			},
		};

		$scope.ContactForm = {
			Name: {
				Name: "Name",
				Explanation: "Enter name",
			},
			Email: {
				Email: "Email Address",
				Explanation: "Enter email",
			},
			Subject: {
				Subject: "Subject",
				Choose: {
					Opt1: "Choose One:",
					Opt2: "General Service",
					Opt3: "Suggestions",
					Opt4: "Product Support",
				},
			},
			Message: {
				Message: "Message",
				Explanation: "Message",
			},
			Buttom: "Send Message",
		};

	}
]);

'use strict';


app.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {

	}
]);

'use strict';
app.controller('DeleteReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				if ($stateParams.id != undefined) {
					$scope.projectId = $stateParams.id;
				}
				
				if ($stateParams.reportid != undefined) {
					$scope.report = reportFactory.getById($stateParams.reportid); // Get report info
				}
				$scope.reportypes = reportTypeFactory.getAll();
			}, 110
		);

 		$scope.deleteReport = function () {
 			reportFactory.delete($stateParams.reportid);
 			$timeout(function () {
      		$state.go('main.project.overview',{'id' : $stateParams.id });
      	}, 110);
 		};

	}
]);
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

'use strict';
app.controller('EditRolesCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 
				 'reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {

		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(1);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(1, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(1);
				$scope.category  = categoryFactory.getCategorybyID(1);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();
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
      $scope.reportInfo.Answer[questionID]['Text'] = '';
      $scope.reportInfo.Answer[questionID]['Textbox'][Object.keys($scope.reportInfo.Answer[questionID]['Textbox'])] = '';
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
            //  console.log(reportInfo['Answer'][keys[i]]);
             // console.log(keys[i]);
            } else {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
              //console.log(reportInfo['Answer']);
                           // console.log(reportInfo['Answer'][keys[i]]);
             
            };
            console.log(answer)
            //console.log("answer " + angular.toJson(newData));

            //reportInfoFactory.post(newData);
          }

  //        window.location.href = "#/reports/" + $scope.reportID;
        };
      

	}
]);
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
'use strict';


app.controller('EditEnvironmentCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	 			'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory','reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, 
		ramesInfoFactory, questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {

		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(4);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(4, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(4);
				$scope.category  = categoryFactory.getCategorybyID(4);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();
				/* Getting the radio button choices */
				/*
				$scope.questionFifteen    	= choicesFactory.getRadioByQuestionId(15);
				$scope.questionTwentySix  	= choicesFactory.getRadioByQuestionId(26);
				$scope.questionThirty  	  	= choicesFactory.getRadioByQuestionId(30);
				*/
				/* Getting the dropdown choices */
				/*
				$scope.questionTwenty 		= choicesFactory.getDrowpdownByQuestionId(20);
				$scope.questionThirtyEight	= choicesFactory.getDrowpdownByQuestionId(38);
				*/
				/* Getting the checkbox choices */
				$scope.questionTwentyThree	= choicesFactory.getCheckboxByQuestionId(23);
				$scope.questionTwentuFive	= choicesFactory.getCheckboxByQuestionId(25);
				$scope.questionTwentySeven 	= choicesFactory.getCheckboxByQuestionId(27);
				$scope.questionThirtyOne	= choicesFactory.getCheckboxByQuestionId(31);
				$scope.questionThirtySix	= choicesFactory.getCheckboxByQuestionId(36);
				$scope.questionThirtySeven	= choicesFactory.getCheckboxByQuestionId(37);


			}, 100
		);


      $scope.color = {
        name: 'blue'
      };
      $scope.specialValue = {
        "id": "12345",
        "value": "green"
      }; 

	$scope.answerValue = function (data, type) {
		//console.log(data)
		
		//console.log(data.Answer)
		if (data.Answer == 'null' || 
			data.Answer == '' || 
			data.Answer == undefined) {
				if (type == 'num')
					return 0;
				else if (type == 'text')
					return '';
				else if (type == 'yesno' || type == 'radio')
					return ''; 
				else
					return '';
		}
		else
			return data.Answer;
	}


    $scope.reportInfo = {
      "ReportID": $stateParams.reportid,
    };


    $scope.resetValue = function(questionID) {
      $scope.reportInfo.Answer[questionID]['Text'] = '';
      $scope.reportInfo.Answer[questionID]['Textbox'][Object.keys($scope.reportInfo.Answer[questionID]['Textbox'])] = '';
    };
    
    $scope.saveInfo = function(reportInfo) {
          var length = Object.keys(reportInfo['Answer']).length;
          var keys = Object.keys(reportInfo['Answer']);
          var reportid = $stateParams.reportid;
          for(var i = 0; i < length; i++) {
            //console.log(typeof(reportInfo['Answer'][keys[i]]));
            if(typeof(reportInfo['Answer'][keys[i]]) == 'object') {
              var newData = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
            //  console.log(reportInfo['Answer'][keys[i]]);
             // console.log(keys[i]);
            } else {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
              console.log(reportInfo['Answer']);
                           // console.log(reportInfo['Answer'][keys[i]]);
             
            };
            //console.log(reportInfo)
            //console.log("answer " + angular.toJson(newData));

            //reportInfoFactory.post(newData);
          }

  //        window.location.href = "#/reports/" + $scope.reportID;
        };
      

	}
]);
'use strict';


app.controller('EditMaterialCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 'reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, questionFactory, 
		choicesFactory, categoryFactory, reportInfoFactory) {

		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(3);
				$scope.answers   	= reportInfoFactory.getByCategoryIdAndReportId(3, $stateParams.reportid);
				$scope.questions  	= questionFactory.getQuestionsByCategoryId(3);
				$scope.category  = categoryFactory.getCategorybyID(3);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();
				/* Getting the radio button choices */
				/*
				$scope.questionFifteen    	= choicesFactory.getRadioByQuestionId(15);
				$scope.questionTwentySix  	= choicesFactory.getRadioByQuestionId(26);
				$scope.questionThirty  	  	= choicesFactory.getRadioByQuestionId(30);
				*/
				/* Getting the dropdown choices */
				/*
				$scope.questionTwenty 		= choicesFactory.getDrowpdownByQuestionId(20);
				$scope.questionThirtyEight	= choicesFactory.getDrowpdownByQuestionId(38);
				*/
				/* Getting the checkbox choices */
				$scope.questionTwentyThree	= choicesFactory.getCheckboxByQuestionId(23);
				$scope.questionTwentuFive	= choicesFactory.getCheckboxByQuestionId(25);
				$scope.questionTwentySeven 	= choicesFactory.getCheckboxByQuestionId(27);
				$scope.questionThirtyOne	= choicesFactory.getCheckboxByQuestionId(31);
				$scope.questionThirtySix	= choicesFactory.getCheckboxByQuestionId(36);
				$scope.questionThirtySeven	= choicesFactory.getCheckboxByQuestionId(37);


			}, 100
		);
	$scope.answerValue = function (data, type, attribute, choice) {
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
			else if (type == 'checkbox') {
				if (attribute == 'data') {
					if (angular.equals({}, data.Answer.checkbox.data))
						return '';
					else {
						angular.forEach(data.Answer.checkbox.data, function(value, key) {
						  
						  if ( value == choice) {
						  	console.log(data.Answer.checkbox.data)
						  console.log(key + ': ' + value +' : ' + choice);
						  	return true;
						  }
						});
					}
				}
				else if (attribute == 'Text') 
					return data.Answer.checkbox.Text;
				else 
					return '';
			}
			else
				return  '';
		}
	}


    $scope.reportInfo = {
      "ReportID": $stateParams.reportid,
    };


    $scope.resetValue = function(questionID) {
      $scope.reportInfo.Answer[questionID]['Text'] = '';
      $scope.reportInfo.Answer[questionID]['Textbox'][Object.keys($scope.reportInfo.Answer[questionID]['Textbox'])] = '';
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
            console.log(reportInfo['Answer'][keys[i]]);
             // console.log(keys[i]);
            } else {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
              //console.log(reportInfo['Answer']);
                           // console.log(reportInfo['Answer'][keys[i]]);
             
            };
            console.log(answer)
            //console.log("answer " + angular.toJson(newData));

            //reportInfoFactory.post(newData);
          }

  //        window.location.href = "#/reports/" + $scope.reportID;
        };
      

	}
]);
'use strict';


app.controller('EditSoftwareCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	 			'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory','reportInfoFactory',

	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, 
		ramesInfoFactory, questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {


		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(5);
				$scope.answers   = reportInfoFactory.getByCategoryIdAndReportId(5, $stateParams.reportid);
				$scope.questions = questionFactory.getQuestionsByCategoryId(5);
				$scope.category  = categoryFactory.getCategorybyID(5);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();
				/* Getting the radio button choices */
				/*
				$scope.questionFifteen    	= choicesFactory.getRadioByQuestionId(15);
				$scope.questionTwentySix  	= choicesFactory.getRadioByQuestionId(26);
				$scope.questionThirty  	  	= choicesFactory.getRadioByQuestionId(30);
				*/
				/* Getting the dropdown choices */
				/*
				$scope.questionTwenty 		= choicesFactory.getDrowpdownByQuestionId(20);
				$scope.questionThirtyEight	= choicesFactory.getDrowpdownByQuestionId(38);
				*/
				/* Getting the checkbox choices */
				$scope.questionTwentyThree	= choicesFactory.getCheckboxByQuestionId(23);
				$scope.questionTwentuFive	= choicesFactory.getCheckboxByQuestionId(25);
				$scope.questionTwentySeven 	= choicesFactory.getCheckboxByQuestionId(27);
				$scope.questionThirtyOne	= choicesFactory.getCheckboxByQuestionId(31);
				$scope.questionThirtySix	= choicesFactory.getCheckboxByQuestionId(36);
				$scope.questionThirtySeven	= choicesFactory.getCheckboxByQuestionId(37);


			}, 100


	)


      $scope.color = {
        name: 'blue'
      };
      $scope.specialValue = {
        "id": "12345",
        "value": "green"
      }; 

	$scope.answerValue = function (data, type) {
		//console.log(data)
		
		//console.log(data.Answer)
		if (data.Answer == 'null' || 
			data.Answer == '' || 
			data.Answer == undefined) {
				if (type == 'num')
					return 0;
				else if (type == 'text')
					return '';
				else if (type == 'yesno' || type == 'radio')
					return ''; 
				else
					return 'User tasks';
		}
		else
			return data.Answer;
	}

    $scope.reportInfo = {
      "ReportID": $stateParams.reportid,
    };


    $scope.resetValue = function(questionID) {
      $scope.reportInfo.Answer[questionID]['Text'] = '';
      $scope.reportInfo.Answer[questionID]['Textbox'][Object.keys($scope.reportInfo.Answer[questionID]['Textbox'])] = '';
    };
    
    $scope.saveInfo = function(reportInfo) {
          var length = Object.keys(reportInfo['Answer']).length;
          var keys = Object.keys(reportInfo['Answer']);
          var reportid = $stateParams.reportid;
          for(var i = 0; i < length; i++) {
            //console.log(typeof(reportInfo['Answer'][keys[i]]));
            if(typeof(reportInfo['Answer'][keys[i]]) == 'object') {
              var newData = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
            //  console.log(reportInfo['Answer'][keys[i]]);
             // console.log(keys[i]);
            } else {
              var answer = {
                "ReportID": reportid,
                "QuestionID": keys[i],
                "Answer": reportInfo['Answer'][keys[i]]
              }
              console.log(reportInfo['Answer']);
                           // console.log(reportInfo['Answer'][keys[i]]);
             
            };
            //console.log(reportInfo)
            //console.log("answer " + angular.toJson(newData));

            //reportInfoFactory.post(newData);
          }

  //        window.location.href = "#/reports/" + $scope.reportID;
        };
      

	}
]);
'use strict';


app.controller('ErrorCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 
	function ($scope, $state, $stateParams, $location, $timeout) {

	}
]);

'use strict';
app.controller('ManagementCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(2);
			}, 200
		);

		
	}
]);
'use strict';
app.controller('NewReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

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
 			var data = {
 				Name : $scope.reportName,
 				ReportTypeID : $scope.data.typeSelect,
 				ProjectID : $stateParams.id
 			};
 			reportFactory.add(data);
 			$timeout(function () {
      			$state.go('main.project.overview',{'id' : $stateParams.id });
      		}, 110);
 		};
	}
]);
'use strict';


app.controller('ProjectCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'projectFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, projectFactory) {
		$timeout(function() {
			$scope.projects = projectFactory.getProjectByUserId();
			if ($stateParams.id != undefined) {
				
				$scope.projectUpdate = projectFactory.getProjectById($stateParams.id);
				$scope.projectId = $stateParams.id;

			}
			
		},110);


        $scope.makeNewProject = function () {
            
            projectFactory.createProject($scope.project);
      
            $timeout(function () {
                $state.go('main.dashboard.overview');
            }, 110);
        };

        $scope.updateProject = function () {
        	projectFactory.updateProject($scope.projectUpdate[0]);
        	
        	$timeout(function () {
        		$state.go('main.dashboard.overview');
        	}, 110);
        };

        $scope.deleteProject = function() {
        	projectFactory.deleteProject($stateParams.id);
        	$timeout(function () {
        		$state.go('main.dashboard.overview');
        	}, 110);
        }
	}
]);


'use strict';


app.controller('RamesActiviteCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(2);
			}, 200
		);

		
	}
]);
'use strict';


app.controller('RamesEnvironmentCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(4);
			}, 200
		);
	}
]);
'use strict';


app.controller('RamesMaterialCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(3);
			}, 200
		);
	}
]);
'use strict';


app.controller('RamesRolesCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(1);
			}, 200
		);
	}
]);
'use strict';


app.controller('RamesSoftwareCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(5);
			}, 200
		);
	}
]);
'use strict';
app.controller('ReportCtrl', ['$scope', '$state', '$stateParams', '$location',
	'$timeout', 'reportTypeFactory', 'reportFactory',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory) {

		$timeout(
			function() {
				// $scope.infos = aboutFactory.getRamesInfoByCategoryId(2); ?????
				$scope.reports = reportFactory.getAll();
				$scope.projectid = $stateParams.id;
				console.log($stateParams.id);
			}, 110
		);
	}
]);

'use strict';

app.controller('ReportTypeCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'reportTypeFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, reportTypeFactory) {

	    $timeout(
			function() {
				$scope.reporttypes = reportTypeFactory.getAll();
				if ($stateParams.id != undefined) {
					$scope.reporttype = reportTypeFactory.getById($stateParams.id)
				}
			}, 200
		);  
 

	    $scope.makeNewType = function () {
	    	reportTypeFactory.add($scope.type);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };

	    $scope.updateReportType = function () {
	    	reportTypeFactory.update($scope.reporttype[0]);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };

	    $scope.deleteReporttype = function() {
	    	reportTypeFactory.delete($stateParams.id);
	    	$timeout(function () {
        		$state.go('main.management.reporttype');
        	}, 110);
	    };
	}
]);

/* About rames info factory */
app.factory('aboutFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var about = {};
    var baseUrl = configFactory.getHttpUrl();

    about.getRamesInfo = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramesinfo")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	about.getRamesInfoByCategoryId = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramesinfo/category/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}
    return about;
}]);
//* AuthenticationFactory */

app.factory('authFactory', ['$http', '$window', '$location', 'configFactory', 
    function ($http, $window, $location, configFactory) {
    var auth = {};
    var baseUrl = configFactory.getHttpUrl();

    auth.saveToken = function (token) {
        $window.localStorage['appToken'] = token;
        //console.log(token);
    };

    auth.getToken = function () {
        return $window.localStorage['appToken'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob( token.split('.')[1]) );

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    auth.isAdmin = function() {
  
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        var scopes = payload.scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (scopes[i] === 'admin') {
                return true;
            }
        }
        return false;

    };

    auth.currentUser = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    auth.currentUserId = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.id;
        }
    };
    auth.currentName = function() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.name;           
        }
    };


    auth.register = function (user) {
        var returnMe;
        $http.post(baseUrl+'/api/auth/register', user).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };

    auth.logIn = function (user) {
        var object = $http.post(baseUrl+'/api/auth/login', user).success(function (data) {
            auth.saveToken(data.token);
        });
        return object;
    };


    auth.logOut = function () {
        $window.localStorage.removeItem('appToken');
        $location.path('/main');
    };

    auth.resetPassword = function (email) {
        var returnMe;

        $http.post(baseUrl+'/api/auth/forgotPassword', {  email: email }).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    auth.newPassword = function (object) {
        var returnMe;
        $http.post(baseUrl+'/api/auth/reset/'+object.token, object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    return auth;
}]);
/* AuthInterceptorFactory */
/* Used to store token with all request to api for authentication */

app.factory('authInterceptor', 
	function ($rootScope, $q, $window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.localStorage['appToken']) {
					//console.log($window.localStorage['appToken']);
					config.headers.Authorization = 'Bearer ' +  $window.localStorage['appToken'];
				}
				return config;
			},
			response: function (response) {
				if (response.status === 401) {
					/* Handle the case where user is not authenticated */
				}
				return response || $q.when(response);
			}
		};
	}
);
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
/* About rames info factory */
app.factory('configFactory', ['$http', '$window', function ($http, $window) {
    
    var config = {};
    var baseUrl = "http://localhost:3001";

    config.getHttpUrl = function () {
		return "http://localhost:3001";
	};




    return config;
}]);
/* About rames info factory */
app.factory('projectFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var project = {};
    var baseUrl = configFactory.getHttpUrl();

/* This one had token in header in which will send the id with it. */
	project.getProjectByUserId = function() {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/project/')
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	};
/* This gets proect by id and is user token id*/
	project.getProjectById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/project/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	};

	project.createProject = function (project) {
		var returnMe;
		$http
		 .post(baseUrl+'/api/project', project)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });

		return returnMe;
	};

	project.updateProject = function (update) {
		var returnMe;
		
		$http
		 .put(baseUrl+'/api/project', update)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });

		return returnMe;
	};

	project.deleteProject = function (id) {
		var returnMe;

		$http
		 .delete(baseUrl+'/api/project/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

    return project;
}]);
/* About rames info factory */
app.factory('categoryFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var category = {};
    var baseUrl = configFactory.getHttpUrl();


    category.getCategoryOrdSeq = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramescategory/ordered/sequenceNumber")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	category.getCategorybyID = function(id) {
		var returnMe = [];
		$http
		 .get(baseUrl + '/api/ramescategory/' + id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		 return returnMe;
	}
    return category;
}]);
/* About rames info factory */
app.factory('ramesInfoFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var info = {};
    var baseUrl = configFactory.getHttpUrl();

    info.getAll = function () {
	 	var returnMe = [];
	    $http.get(baseUrl + "/api/ramesinfo")
	      .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
    }
    info.getByCategoryId = function (id) {
	 	var returnMe = [];
	    $http.get(baseUrl + "/api/ramesinfo/category/"+id)
	      .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
    }
    return info;
}]);
/* About rames info factory */
app.factory('questionFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
		var question = {};
		var baseUrl = configFactory.getHttpUrl();

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
/* About rames info factory */
app.factory('reportFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var report = {};
    var baseUrl = configFactory.getHttpUrl();

    report.getAll = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reports")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	report.getById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl+ "/api/reports/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}

	report.add = function (toAdd) {
		console.log(toAdd);
		var returnMe;
		$http
		 .post(baseUrl+'/api/reports', toAdd)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	report.update = function (object) {
		var returnMe;
		$http
		 .put(baseUrl+'/api/reports/', object)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	report.delete = function (id) {
		var returnMe;
		$http
		 .delete(baseUrl+'/api/reports/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};





    return report;
}]);
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


/* About rames info factory */
app.factory('reportTypeFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var reportType = {};
    var baseUrl = configFactory.getHttpUrl();

    reportType.getAll = function () {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reporttype")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}

	reportType.getById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl+ "/api/reporttype/"+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	}

	reportType.add = function (toAdd) {
		var returnMe;
		$http
		 .post(baseUrl+'/api/reporttype', toAdd)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	reportType.update = function (object) {
		var returnMe;
		$http
		 .put(baseUrl+'/api/reporttype/', object)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};

	reportType.delete = function (id) {
		var returnMe;
		$http
		 .delete(baseUrl+'/api/reporttype/'+id)
		  .success(function (data) {
		  	angular.copy(data, returnMe);
		  });
		return returnMe;
	};





    return reportType;
}]);
/* About rames info factory */
app.factory('userFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var user = {};
    var baseUrl = configFactory.getHttpUrl();

    user.getUserById = function (id) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/ramescategory/ordered/sequenceNumber")
		  .success(function (data) {
			angular.copy(data, returnMe);
		});
		return returnMe;
	}
    return user;
}]);