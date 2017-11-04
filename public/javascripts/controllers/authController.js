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