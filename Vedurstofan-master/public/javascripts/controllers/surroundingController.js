/* Surrounding Controller*/

app.controller('SurroundingCtrl', ['$scope', 'surrounding', '$state', '$stateParams', 'auth', '$timeout',
    function ($scope, surrounding, $state, $stateParams, auth, $timeout) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.AllSurroundings= surrounding.getSurroundings();

        $scope.updates = surrounding.getSurroundingBySurroundings($stateParams.surroundings);
    	
    	$scope.addSurrounding = function () {
            var object = {
                surrounding : $scope.surroundingName
            };

            surrounding.addSurrounding(object);
            $scope.surroundingName = '';
            $timeout(function() {
               var temp = surrounding.getSurroundings();
               $scope.AllSurroundings = temp;
            }, 110);
        };  

        $scope.updateSurroundings = function () {
            surrounding.updateSurroundings($scope.updates);
            var temp = $scope.updates;
            $scope.updates = temp;

            var temp = surrounding.getSurroundings();
            AllSurroundings = temp;
            $timeout(function() {
                $state.go('home.surrounding');
            }, 110);
        };
 }]);