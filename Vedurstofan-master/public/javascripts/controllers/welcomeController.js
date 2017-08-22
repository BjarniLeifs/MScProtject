/* Welcome Controller*/
app.controller('WelcomeCtr', ['$scope', '$state', 'auth',
    function ($scope, $state, auth) {
    	$scope.isAdmin = auth.isAdmin();
    	$scope.isMod = auth.isMod();
    	$scope.isWriter = auth.isWriter();

    }
]);