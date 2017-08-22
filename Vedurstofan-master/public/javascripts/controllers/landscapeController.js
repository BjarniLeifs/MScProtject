/* Landscape Controller*/

app.controller('LandscapeCtrl', ['$scope', 'landscape', '$state', '$stateParams', '$timeout', 'auth',
    function ($scope, landscape, $state, $stateParams, $timeout, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.Alllandscape= landscape.getAllLandscape();

        $scope.update = landscape.getLandscapeByLandscape($stateParams.landscape);

    	$scope.addLandscape = function () {
            var object = {
                landscape   : $scope.landscape,
                description : $scope.descriptionLandscape
            };
            
            landscape.addLandscape(object); 

            $timeout(function() {
               var temp = landscape.getAllLandscape();
               $scope.Alllandscape = temp;
            },110);
 
            $scope.landscape = '';
            $scope.descriptionLandscape = ''; 

        };

        $scope.updateLandscape = function () {
            landscape.updateLandscape($scope.update);
            var temp = $scope.update;
            $scope.update = temp;

            var temp = landscape.getAllLandscape();
            $scope.Alllandscape = temp;

            $timeout(function() {
                $state.go('home.landscape');
            }, 110);
        };

 }]);