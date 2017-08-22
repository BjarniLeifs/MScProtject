/* Antenna Controller*/

app.controller('AntennaCtrl', ['$scope', '$timeout', 'antenna', '$state', '$stateParams', 'auth',
    function ($scope, $timeout, antenna, $state, $stateParams, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.AllAntenna = antenna.getAllAntenna();
        $scope.update = antenna.getAntennaByName($stateParams.name);

    	$scope.addAntenna = function () {
    		var object = {
    			name 		: $scope.antennaName,
    			igs_defined : $scope.igs,
    			model 		: $scope.model
    		};
    		antenna.addAntenna(object);
            $scope.antennaName = '';
            $scope.igs = '';
            $scope.model = '';
            $scope.AllAntenna = antenna.getAllAntenna();
            $timeout(function() {
               var temp = antenna.getAllAntenna();
                $scope.AllAntenna = temp;
            }, 110);

    	};

        $scope.updateAntennaType = function () {
            antenna.updateAntennaType($scope.update);
            var temp = $scope.update;
            $scope.update = temp;
            $timeout(function() {
                $state.go('home.antenna');
                }, 100);

        };
 	}
 	
 ]);