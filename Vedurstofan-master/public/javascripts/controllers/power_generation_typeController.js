/* Power Generation Type Controller*/

app.controller('PowerGenTypeCtrl', ['$scope', 'power_generation_type', '$state', '$stateParams', 'auth','$timeout',
    function ($scope, power_generation_type, $state, $stateParams, auth, $timeout) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.AllPowerGenType = power_generation_type.getPowerGenType();
        $scope.update = power_generation_type.getPowerGenTypeByName($stateParams.name);

        $scope.addPowerGenType = function () {
            var object = {
                name : $scope.name
            };

            //console.log(object);
            power_generation_type.addPowerGenType(object); 
            $scope.name = '';
            $timeout(function() {
               var temp = power_generation_type.getPowerGenType();
               $scope.AllPowerGenType = temp;
            }, 110);
        };

        $scope.updatePowerGenType = function () {
            power_generation_type.updatePowerGenType($scope.update);
            var temp = $scope.update;
            $scope.update = temp;

            var temp = power_generation_type.getPowerGenType();
            AllPowerGenType = temp;

            $timeout(function() {
                $state.go('home.pgt');
            }, 110);

        };
        
 	}
 	
 ]);