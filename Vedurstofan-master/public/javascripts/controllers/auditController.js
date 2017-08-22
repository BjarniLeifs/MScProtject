/* AuditController*/
app.controller('AuditCtrl', ['$scope', '$timeout', '$state', 'audit', 'userFact', 'auth', '$stateParams',
    function ($scope, $timeout, $state, audit, userFact, auth, $stateParams) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
        $scope.allHistory = audit.getAllHistory();
        $scope.getUserByName = userFact.getUserByName($stateParams.name);
        $scope.userId ={};
        $scope.getUserHistory = [];

        
        
        $timeout(function() {
        	$scope.userId = $scope.getUserByName.id;
        	console.log($scope.userId);
        	$scope.getUserHistory = audit.getAllUserHistory($scope.userId);

       
        }, 200);
         






 }]);