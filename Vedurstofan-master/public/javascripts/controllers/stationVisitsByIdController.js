/* Station Visit Controller*/

app.controller('StationVisitByIdCtrl', ['$scope', 'stationVisitById', '$state', '$stateParams','auth',
    function ($scope, stationVisitById, $state, $stateParams, auth) {
    	$scope.isAdmin = auth.isAdmin();
    	$scope.isMod = auth.isMod();
    	$scope.isWriter = auth.isWriter();
        $scope.stationVisitById = {};
        /* Birtir lista af öllum eftirlitum eftir station ID */
        $scope.visits = stationVisitById.getStationVisitByStationId($stateParams.id);
        $scope.visitsById = stationVisitById.getStationVisitById($stateParams.id);
        
        
}]);