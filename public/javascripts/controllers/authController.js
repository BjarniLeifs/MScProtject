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