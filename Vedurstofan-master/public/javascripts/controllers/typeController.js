/* Type Controller */
app.controller('TypeCtrl', ['$scope', '$state', 'type','auth', '$stateParams', '$timeout',
    function ($scope, $state, type, auth, $stateParams, $timeout) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
        $scope.allStationType = type.getAllType();

        $scope.update = type.getTypeById($stateParams.id)

        $scope.addType = function () {
            var object = {
                name : $scope.typeName,
                type : $scope.typet
            };

            type.addType(object);
            $timeout(function() {
               var temp = type.getAllType();
               $scope.allStationType = temp;
            }, 110);
        };  

         $scope.updateType = function () {
            type.updateType($scope.update);
            var temp = $scope.update;
            $scope.update = temp;

            var temp = type.getAllType();
            $scope.allStationType = temp;

            $timeout(function() {
                $state.go('home.stationtype');
            }, 210);
        };

    }
]);