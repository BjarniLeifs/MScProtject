/*! Made on 04-11-2017 */
/* Angular routing and app declatation */

var app = angular.module('ramesApp', ['ui.router', 'angular-growl']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
	'growlProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, growlProvider) {
		$httpProvider.interceptors.push('authInterceptor');
		growlProvider.globalTimeToLive(3000);
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
		.state('main.project.viewreport', {
			url: '/report/:reportid/view',
			templateUrl: 'views/projectoverview/report.html',
			controller: 'ViewReportCtrl',
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
	'growl',
	function ($scope, $state, $stateParams, $location, $timeout, authFactory, growl) {
        $scope.newUser = {};
		$scope.loginUser = {};
		$scope.isLoggedIn = authFactory.isLoggedIn();

		$scope.currentName = authFactory.currentName();
		$scope.isLoggedIn = authFactory.isLoggedIn();

		$scope.register = function () {
			var config = {};
			if ($scope.newUser.username == '' || $scope.newUser.firstName == ''
				|| $scope.newUser.lastName == '' || $scope.newUser.email == '')
				growl.warning("Please fill out all fields.", config);
			else {	
				if ($scope.password === $scope.confirmPassword) {
					var registerObject = {
						username 		: $scope.newUser.username,
						password 		: $scope.newUser.password,
						confirmPassword : $scope.newUser.confirmPassword,
						name 			: $scope.newUser.firstName + ' ' + $scope.newUser.lastName,
						email 			: $scope.newUser.email
					};
					authFactory.register(registerObject).then(function (response) {
						if (response.status == 200) {
							growl.success("Successfully registered.", config);
							$state.go('main', {}, {reload: true});
						}
					}, function (error) {
						if (error.status == 409)
							growl.warning("Username already exists.", config);
						if (error.status == 401)
							growl.warning("Please fill out all information", config);
						else if (error.status == 400)
							growl.error("Something went wrong.", config);


					});
					
				} else {
					growl.warning("The passwords did not match!", config);
				}
			}
			$scope.newUser = {};
		};

		$scope.login = function () {
			var config = {};
			if ($scope.loginUser.username && $scope.loginUser.password) {
				var loginObject = {
					username : $scope.loginUser.username,
					password : $scope.loginUser.password
				};
				authFactory.logIn(loginObject).then(function (response) {
				
					if (response.status == 200) {
						console.log(response.data.token)
						authFactory.saveToken(response.data.token);
						growl.success("Successfully loged in.", config);	
					}            
    
				}, function (error) {
					if (error.status == 404)
						growl.warning("No such user found.", config);
					else if (error.status == 401)
						growl.warning("Inncorrect password.", config);
					else
						growl.error("Something went wrong.", config)
				});
				$timeout(
					function() {
						$scope.isLoggedIn = authFactory.isLoggedIn();	
					}, 130
				);			
							
				$timeout(
					function() {
						$state.go('main', {}, {reload: true});		
					}, 350
				);
				$scope.loginUser = {};

			} else {
				growl.warning("You need to provide username and login!", config);
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
	'$timeout', 'reportTypeFactory', 'reportFactory', 'growl',

	function ($scope, $state, $stateParams, $location, 
	 $timeout, reportTypeFactory, reportFactory, growl) {

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
 			var config = {};
 			reportFactory.delete($stateParams.reportid)
 			.then(function (response) {
 				if (response.status == 200) {
 					growl.success("Successfully deleted plan.", config);
 					$state.go('main.project.overview',{'id' : $stateParams.id });		
 				} else 
 					growl.warning("Something went wrong.", config);
 			}, function (error) {
 				if (error.status == 404)
 					growl.error("Something went wrong.", config);
 			});
 		
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
'use strict';


app.controller('EditMaterialCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 'reportInfoFactory',
				 'growl',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, questionFactory, 
		choicesFactory, categoryFactory, reportInfoFactory, growl) {
		$scope.buttonNext = "Save & Next";
		$scope.buttonSave = "Save Information";
		$timeout(
			function() {
				$scope.ramesInfo = ramesInfoFactory.getByCategoryId(3);
				$scope.answers   	= reportInfoFactory.getByCategoryIdAndReportId(3, $stateParams.reportid);
				$scope.questions  	= questionFactory.getQuestionsByCategoryId(3);
				$scope.category  = categoryFactory.getCategorybyID(3);
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
					$state.go('main.editreport.editenvironment');
				else
					growl.success("Information successfully saved.", config);
			}
		};
	}
]);
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
'use strict';


app.controller('ProjectCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'projectFactory',
    'growl', 
	function ($scope, $state, $stateParams, $location, $timeout, projectFactory, growl) {
		$timeout(function() {
			$scope.projects = projectFactory.getProjectByUserId();
			if ($stateParams.id != undefined) {
				
				$scope.projectUpdate = projectFactory.getProjectById($stateParams.id);
				$scope.projectId = $stateParams.id;

			}
			
		},110);


        $scope.makeNewProject = function () {
            var config = {};
            projectFactory.createProject($scope.project)
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Project successfully created.", config);
                    $state.go('main.dashboard.overview');    
                }
            }, function (error) {
                if (error.status == 400)
                    growl.error("Something went wrong.",config);
            });
        };

        $scope.updateProject = function () {
        	var config = {};
            projectFactory.updateProject($scope.projectUpdate[0])
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Project updated.", config);
                    $state.go('main.dashboard.overview');    
                }
            }, function (error) {
                if (error.status == 400)
                    growl.error("Something went wrong.", config);
            });
        	
        };

        $scope.deleteProject = function() {
            var config = {};
        	projectFactory.deleteProject($stateParams.id)
            .then(function (response) {
                if (response.status == 200) {
                    growl.success("Successfully deleted project", config);
                    $state.go('main.dashboard.overview');
                }
            }, function (error) {
                if (error.status == 403)
                    growl.warning("This project is not yours.", config);
                else 
                    growl.error("Something went wrong.", config);
            });

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
				console.log($stateParams.id);
				// $scope.infos = aboutFactory.getRamesInfoByCategoryId(2); ?????
				$scope.reports = reportFactory.getReportByProjectId($stateParams.id); // þetta á að vera get report by projectid
				$scope.projectid = $stateParams.id;
				$scope.reportypes = reportTypeFactory.getAll();

			}, 110
		);

	}
]);
// Byrja á að eyða öllum reports í prjoect ef það er eytt... svo laga þetta.
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

'use strict';
app.controller('ViewReportCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory',
				 'ramesInfoFactory', 'questionFactory', 'choicesFactory', 'categoryFactory', 
				 'reportInfoFactory',
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, ramesInfoFactory, 
		questionFactory, choicesFactory, categoryFactory, reportInfoFactory) {

				$scope.ramesInfo = ramesInfoFactory.getAll();
				$scope.answers   = reportInfoFactory.getByReportId($stateParams.reportid);
				$scope.questions = questionFactory.getAll(1);
				$scope.category  = categoryFactory.getCategoryOrdSeq(1);
				$scope.dropdown  = choicesFactory.getDrowpdown();
				$scope.checkbox  = choicesFactory.getCheckbox();
				$scope.radio 	 = choicesFactory.getRadio();


		$timeout(
			function() {
				$scope.viewReport = [];
/* Populating viewReport above to build table of information */
				angular.forEach($scope.category, 
					function (cat, cKey) {
/* First we need to make object to push information in to use. here we extract category name*/
						var addMe = {
								Category: cat.Category,
								Info : []					
							};
/* Next we need to look for information on what is each subsection R1, R2..., S1 ...*/
						angular.forEach($scope.ramesInfo,
							function (info, iKey) {
								if(info.CategoryID == cat.ID) {
/* Here we are going to make sure that category and info is in same subsections */
									var text = '';	
									angular.forEach($scope.questions,
										function (que, qKey) {
											if (info.ID == que.RamesInfoID) {
/* Here we are making sure that the information is consisting with rames info */
												angular.forEach($scope.answers,
													function (ans, aKey) {
														if (ans.QuestionID == que.ID) {
/* Here we are building up the information text to give out to the table. */
/* We also need to be sure that the information is not undefined or other things 
by checking what it is and so an after what we get in json object. */
															
															if (ans.Answer.number){
																if (text == '')
																	text += ans.Answer.number;
																else 
																	text += ' ,'+ans.Answer.number;
															}
															else if (ans.Answer.Text) {
																if (ans.Answer.Text.conditionalyesnotext) {
																	if (text == '')
																		text += ans.Answer.Text.conditionalyesnotext;
																	else
																		text += ans.Answer.Text.conditionalyesnotext;
																}
																else {
																	if (text == '')
																		text += ans.Answer.Text;
																	else
																		text += ' ,'+ans.Answer.Text;
																}
																if (ans.Answer.Textbox) {
																	if (ans.Answer.Textbox.conditionalyesnotext) {
																		if (text == '')
																			text += ans.Answer.Textbox.conditionalyesnotext;
																		else
																			text += ans.Answer.Textbox.conditionalyesnotext;
																	}
																	else {
																		if (text == '')
																			text += ans.Answer.Textbox;
																		else
																			text += ', '+ans.Answer.Textbox;
																	}
																}
															}
															else if (ans.Answer.checkbox) {
																if (ans.Answer.checkbox.data) {
																	angular.forEach(ans.Answer.checkbox.data,
																		function(value, key) {
																			if (text == '')
																				text += value;
																			else
																				text += ', '+value;		
																		})
																	if (ans.Answer.checkbox.Text) {
																		if (text == '')
																			text += ans.Answer.checkbox.Text;
																		else
																			text += ', '+ ans.Answer.checkbox.Text;
																	}

																}
															}
															else if (ans.Answer.text) {
																if (text == '')
																	text += ans.Answer.text;
																else
																	text += ', '+ ans.Answer.text;
															}
															else if (ans.Answer.radio) {
																if (text == '')
																	text += ans.Answer.radio;
																else 
																	text += ', '+ ans.Answer.radio;
															}
															else if (ans.Answer.yesno) {
																if (text == '')
																	text += ans.Answer.yesno;
																else 
																	text += ', '+ ans.Answer.yesno;
															}
															else if (ans.Answer.conditionalyesnotext) {
																if( text == '')
																	text += ans.Answer.conditionalyesnotext;
																else
																	text += ', '+ ans.Answer.conditionalyesnotext;
															}
														}
													}
												)

											}
										}
									)
/* Now we have extrated all information we need and built up the string to use it. */
									addMe.Info.push(
									{
										Name : info.Name,
										Value : text
									});
									text = '';
								}				
							}
						)
/* Now we add it to report object and clear all information to ensure it wont get currupted. */
						$scope.viewReport.push(addMe);
						addMe = [];
					}
				)
			}, 150
		);

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

app.factory('authFactory', ['$http', '$window', '$location', 'configFactory', 'growl',
    function ($http, $window, $location, configFactory, growl) {
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
            var payload = JSON.parse($window.atob(token.split('.')[1]));

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
        return $http.post(baseUrl+'/auth/register', user);
    };

    auth.logIn = function (user) {
        
        var user =  $http.post(baseUrl+'/auth/login', user);
        console.log(user);
        return user;
    };


    auth.logOut = function () {
        $window.localStorage.removeItem('appToken');
        $location.path('/main');
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
		return $http.post(baseUrl+'/api/project', project);
	};

	project.updateProject = function (update) {
		return $http.put(baseUrl+'/api/project', update);
	};

	project.deleteProject = function (id) {
		return $http.delete(baseUrl+'/api/project/'+id);
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
/* About rames info factory */
app.factory('reportFactory', ['$http', '$window', 'configFactory', 
	function ($http, $window, configFactory) {
    
    var report = {};
    var baseUrl = configFactory.getHttpUrl();

    report.getReportByProjectId = function (pid) {
		var returnMe = [];
		$http
		 .get(baseUrl + "/api/reports/project/"+pid)
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
		return $http.post(baseUrl+'/api/reports', toAdd);
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
		return $http.delete(baseUrl+'/api/reports/'+id);
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
			console.log(data);
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

		return returnMe;

	}

	info.post = function (data) {
		
		return $http.put(baseUrl + '/api/reportsinfo', data);//.success(function (data) {
		
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