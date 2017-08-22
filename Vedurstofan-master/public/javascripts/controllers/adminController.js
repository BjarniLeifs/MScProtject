/* AuthController*/
app.controller('AdminCtrl', ['$scope', '$state', 'admin', 'auth',
    function ($scope, $state, admin, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();

        $scope.changeUserPassword = function () {
        	
        	var userInfo = {
        		username: $scope.username,
        		password: $scope.password
        	};

        	admin.changeUserPassword(userInfo);
       
        };

    }
]);