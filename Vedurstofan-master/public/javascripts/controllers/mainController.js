/* MainController */

app.controller('MainCtrl', ['$scope', 'auth', '$state', 'userFact',
    function ($scope, auth, $state, userFact) {
    	$scope.isAdmin = auth.isAdmin();
    	$scope.isMod = auth.isMod();
    	$scope.isWriter = auth.isWriter();
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser();
        $scope.user = userFact.getUserByUsername(auth.currentUser());
        $scope.logOut = function () {
        	auth.logOut();
        	$state.go('login');
        }


    }
    
]);
