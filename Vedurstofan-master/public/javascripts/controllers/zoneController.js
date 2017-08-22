/* Zone Controller*/

app.controller('ZoneCtrl', ['$scope', '$timeout', 'zone', '$state', '$stateParams','auth',
    function ($scope, $timeout, zone, $state, $stateParams, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.Allzone = zone.getZone();
        $scope.update = zone.getZoneByName($stateParams.name);

        $scope.addZone = function () {
            var object = {
                name : $scope.name
            };

            //console.log(object);
            zone.addZone(object);
            $timeout(function() {
               var temp = zone.getZone();
                $scope.Allzone = temp; 
            }, 110) 
            $scope.name = '';
        };

        $scope.updateZone = function () {
            zone.updateZone($scope.update);
            var temp = $scope.update;
            $scope.update = temp;
            $timeout(function() {
                $state.go('home.zone')
                }, 100);
        
        };
        
 	}
 	
 ]);