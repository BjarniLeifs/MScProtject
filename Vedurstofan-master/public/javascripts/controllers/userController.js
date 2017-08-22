/* UserController*/

app.controller('UserCtrl', ['$scope', 'userFact', '$state', '$stateParams', 'auth','$timeout','Upload',
	function ($scope, userFact, $state ,$stateParams, auth, $timeout, Upload) {
		$scope.isAdmin = auth.isAdmin();
    	$scope.isMod = auth.isMod();
    	$scope.isWriter = auth.isWriter();
		$scope.users = userFact.getAllUsers();
		$scope.adduser ={};
		$scope.authuser = auth.currentUser();
        $scope.changepass = {};

		$timeout(function() {
			$scope.adduser = userFact.getUserByName($stateParams.name);
		}, 200);
		

		$scope.adduser = {
            isadmin     : false, 
            isactive    : false, 
            isreader    : false, 
            iswriter    : false, 
            ismoderator : false
        };
        $scope.pass = {};
        $scope.email = '';
        $scope.user.photoUrl = '/image/users/undefined.png';
		
		$scope.newUser = function () {
            auth.register($scope.adduser);
            $timeout(function() {
                var temp = userFact.getAllUsers();
                $scope.users = temp;
            }, 200);
            //$scope.user = {};
            $scope.user.photoUrl = '/image/users/undefined.png';

        };

        $scope.uploadUserPic = function(file) {

            $scope.user.photoUrl = '/image/users/' + $scope.picFile.name
            file.upload = Upload.upload({
                url: '/api/userImage',
                data: {users: file, username: $scope.username}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, 
            function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, 
            function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };


		
		$scope.update = function () {	
			userFact.updateUser($scope.adduser);
            userFact.updateUserPassword($scope.changepass);
			var temp = $scope.user;
			$scope.user = temp;

			var temp = auth.currentUser();
			authuser = temp;

			$timeout(function() {
				$state.go('home.name.profile');
			}, 210);
			

		};

}]);

