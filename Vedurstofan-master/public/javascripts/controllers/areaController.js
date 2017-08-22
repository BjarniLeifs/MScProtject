/* Area Controller*/

app.controller('AreaCtrl', ['$scope', 'area', '$state', '$stateParams', 'auth','$timeout',
    function ($scope, area, $state, $stateParams, auth, $timeout) {

    	$scope.Allarea = area.getArea();
        $scope.update = area.getAreaByArea($stateParams.area);

        $scope.addArea = function () {
            var object = {
                area        : $scope.area,
                description : $scope.descriptionArea
            };

            area.addArea(object);  
            
            $timeout(function() {
               var temp = area.getArea();
               $scope.Allarea = temp;
            }, 110);
        };

        $scope.updateArea = function () {
            area.updateArea($scope.update);
            var temp = $scope.update;
            $scope.update = temp;
            
            var temp = area.getArea();
            $scope.Allarea = temp;

            $timeout(function() {
                $state.go('home.area');
            }, 110);

        };
 	}
 	
 ]);