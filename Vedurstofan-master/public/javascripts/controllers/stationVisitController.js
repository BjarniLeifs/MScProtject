/* Station Visit Controller*/

app.controller('StationVisitCtrl', ['$scope', 'stationVisit','station', 'userFact', '$state', '$stateParams','auth',
    function ($scope, stationVisit, station, userFact, $state, $stateParams, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
        $scope.stationVisit = {};
        /* Birtir lista af öllum stöðvum */
    	$scope.AllStationVisits = stationVisit.getAllStationVisit();
        /* set default value to false */
        $scope.other = false;
        $scope.station_isokei = false;
        $scope.photos_taken = false;
        $scope.altimeter = false;
        $scope.desiccant_refurbished = false;
        $scope.operating_system = false;
        $scope.battery = false;
        $scope.telecommunications_equipment = false;
        $scope.precipitation_gauge = false;
        $scope.bearings = false;
        $scope.scale = false;
        $scope.refurbish = false;
        $scope.equipment = false;



        //$scope.visitUpdate = stationVisit.getVisitById($stateParams.id);
              
        $scope.addVisitCatagory = function () {
                var catagory = {
                    equipment                     : $scope.equipment,
                    refurbish                     : $scope.refurbish, 
                    scale                         : $scope.scale,
                    bearings                      : $scope.bearings,
                    precipitation_gauge           : $scope.precipitation_gauge, 
                    telecommunications_equipment  : $scope.telecommunications_equipment,
                    battery                       : $scope.battery,
                    operating_system              : $scope.operating_system, 
                    desiccant_refurbished         : $scope.desiccant_refurbished,
                    altimeter                     : $scope.altimeter,
                    photos_taken                  : $scope.photos_taken, 
                    other                         : $scope.other,
                    comment                       : $scope.vccomment,
                    reason_comment                : $scope.reason_comment

                };
                stationVisit.addVisitCatagory(catagory).success(function (data) {
                        var next = {
                            nextvisit : $scope.nextvisit
                        };
                        stationVisit.addVisitDate(next).success(function (nextID) {
                            var object = {
                                station_id     : $scope.data.stationSelected.id,
                                comments       : $scope.comments,
                                user_id        : $scope.data.userSelected.id,
                                work_done      : $scope.work_done,
                                catagory_id    : data.id,
                                next_id        : nextID.id,
                                user2_id       : $scope.data.user2Selected.id,
                                user3_id       : $scope.data.user3Selected.id,
                                station_isokei : $scope.station_isokei
                                
                            };
                            //console.log(object);
                            //console.log(nextID);
                            stationVisit.addStationVisit(object).success(function (addID) { 
                            $state.go('home.profileVisit', {id: addID.id});
                            });
                        });                          
                });
        };


        $scope.data = {
            stationOptions: station.getAllStations(),
            stationSelected: {id: station.id, name: station.name},

            userOptions: userFact.getAllUsers(),
            userSelected: {id: userFact.id, name: userFact.name},

            user2Options: userFact.getAllUsers(),
            user2Selected: {id: userFact.id, name: userFact.name},

            user3Options: userFact.getAllUsers(),
            user3Selected: {id: userFact.id, name: userFact.name} 
        };  

        $scope.updateStationVisit = function () { 

            stationVisit.updateVisitReason($scope.visitUpdate);
            var temp = $scope.visitUpdate;
            $scope.visitUpdate = temp;
        };   

        
}]);