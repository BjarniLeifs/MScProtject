/* StationController*/

app.controller('StationCtrl', ['$scope', '$timeout', 'station', 'landscape', 'type', 'contact', 'area', 'surrounding', 'network', 'zone', 'power_generation_type', '$state', '$stateParams', 'auth', 'Upload', '$timeout','stationComments',
    function ($scope, $timeout, station, landscape, type, contact, area, surrounding, network, zone, power_generation_type, $state, $stateParams, auth, Upload, $timeout, stationComments) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();        
        $scope.station = {};
        $scope.stations = station.getAllStations();
        $scope.currentUser = auth.currentUserId();
        //$scope.stationName = station.getStationByName($stateParams.name);
        $scope.stationUpdateName = station.getStationByNameForUpdate($stateParams.name);
        //$scope.stationUpdateName = station.getStationByID($stateParams.id);
        $scope.simageurl = '/image/stations/undefined.png';

        $timeout(function() {
            $scope.stationComment = stationComments.getStationCommentByStationId($scope.stationUpdateName.id);
        }, 110);

        $scope.networkAvailable = network.getAllNetwork();
        $scope.landscapeAvailable = landscape.getAllLandscape();
        $scope.zoneAvailable = zone.getZone();
        $scope.typeAvailable = type.getAllType();
        $scope.contactAvailable = contact.getAllContacts();
        $scope.contactDataAvailable = contact.getAllContacts();
        $scope.powerAvailable = power_generation_type.getPowerGenType();
        $scope.surroundingAvailable = surrounding.getSurroundings();
        $scope.areaAvailable = area.getArea();
        $scope.contactOwnerAvailable = contact.getAllContacts();
        $scope.contactCareAvailable = contact.getAllContacts();
        $scope.networks = {};
        $scope.landscapes = {};
        $scope.zones = {};
        $scope.types = {};
        $scope.conascon = {};
        $scope.condata = {};
        $scope.powers = {};
        $scope.surr = {};
        $scope.ar = {};
        $scope.conowner = {};
        $scope.concare = {};

        $timeout(function () {
            var concareID;
            for(var i = 0; i < $scope.contactCareAvailable.length; i++) {
                if($scope.contactCareAvailable[i].name === $scope.stationUpdateName.caretaker)
                    concareID = $scope.contactCareAvailable[i].id;
            }
            var conownerID;
            for(var i = 0; i < $scope.contactOwnerAvailable.length; i++) {
                if($scope.contactOwnerAvailable[i].name === $scope.stationUpdateName.cowner_name)
                    conownerID = $scope.contactOwnerAvailable[i].id;
            }
            var areaID;
            for(var i = 0; i < $scope.areaAvailable.length; i++) {
                if($scope.areaAvailable[i].area === $scope.stationUpdateName.area_name)
                    areaID = $scope.areaAvailable[i].id;
            }
            var surrID;
            for(var i = 0; i < $scope.surroundingAvailable.length; i++) {
                if($scope.surroundingAvailable[i].surroundings === $scope.stationUpdateName.surround)
                    surrID = $scope.surroundingAvailable[i].id;
            }
            var netWorkID;
            for(var i = 0; i < $scope.networkAvailable.length; i++) {
                if($scope.networkAvailable[i].name === $scope.stationUpdateName.network_name)
                    netWorkID = $scope.networkAvailable[i].id;
            }
            var landscapeID;
            for(var i = 0; i < $scope.landscapeAvailable.length; i++) {
                if($scope.landscapeAvailable[i].landscape === $scope.stationUpdateName.landscape)
                    landscapeID = $scope.landscapeAvailable[i].id;
            }
            var zoneID;
            for(var i = 0; i < $scope.zoneAvailable.length; i++) {
                if($scope.zoneAvailable[i].name === $scope.stationUpdateName.zone_name)
                    zoneID = $scope.zoneAvailable[i].id;
            }
            var typeID;
            for(var i = 0; i < $scope.typeAvailable.length; i++) {
                if($scope.typeAvailable[i].name === $scope.stationUpdateName.stype_name)
                    typeID = $scope.typeAvailable[i].id;
            }
            var conasconID;
            for(var i = 0; i < $scope.contactAvailable.length; i++) {
                if($scope.contactAvailable[i].name === $scope.stationUpdateName.ccontact_name)
                    conasconID = $scope.contactAvailable[i].id;
            }
            var condataID;
            for(var i = 0; i < $scope.contactDataAvailable.length; i++) {
                if($scope.contactDataAvailable[i].name === $scope.stationUpdateName.cdata_name)
                    condataID = $scope.contactDataAvailable[i].id;
            }
            var powerID;
            for(var i = 0; i < $scope.powerAvailable.length; i++) {
                if($scope.powerAvailable[i].name === $scope.stationUpdateName.pgt_name)
                    powerID = $scope.powerAvailable[i].id;
            }
            $scope.concare.selected = {
                name : $scope.stationUpdateName.caretaker,
                id   : concareID
            };
            $scope.conowner.selected = {
                name : $scope.stationUpdateName.cowner_name,
                id   : conownerID
            };
            $scope.ar.selected = {
                area : $scope.stationUpdateName.area_name,
                id   : areaID
            };
            $scope.surr.selected = {
                name : $scope.stationUpdateName.surround,
                id   : surrID
            };
            $scope.networks.selected = {
                name : $scope.stationUpdateName.network_name,
                id   : netWorkID
            };
            $scope.landscapes.selected = {
                landscape : $scope.stationUpdateName.landscape,
                id   : landscapeID
            };
            $scope.zones.selected = {
                name : $scope.stationUpdateName.zone_name,
                id   : zoneID
            };
            $scope.types.selected = {
                name : $scope.stationUpdateName.stype_name,
                id   : typeID
            };
            $scope.conascon.selected = {
                name : $scope.stationUpdateName.ccontact_name,
                id   : conasconID
            };
            $scope.condata.selected = {
                name : $scope.stationUpdateName.cdata_name,
                id   : condataID
            };
            $scope.powers.selected = {
                name : $scope.stationUpdateName.pgt_name,
                id   : powerID
            };

        }, 200);

        $scope.updateStation = function () {
            var object = {
                id: $scope.stationUpdateName.id,
                name : $scope.stationUpdateName.name,
                marker : $scope.stationUpdateName.marker,
                permanent_marker : $scope.stationUpdateName.permanent_marker,
                lat : $scope.stationUpdateName.lat,
                lon : $scope.stationUpdateName.lon, 
                altitude : $scope.stationUpdateName.altitude,
                description : $scope.stationUpdateName.description,
                date_from : $scope.stationUpdateName.date_from,
                date_to : $scope.stationUpdateName.date_to, 
                comment : $scope.stationUpdateName.comment,
                is_active : $scope.stationUpdateName.is_active,
                id_network : $scope.networks.selected.id,
                id_landscape : $scope.landscapes.selected.id,
                id_zone : $scope.zones.selected.id,
                id_station_type : $scope.types.selected.id,
                id_contact_as_contact : $scope.conascon.selected.id,
                id_contact_as_data_owner : $scope.condata.selected.id,
                id_power_generation_type : $scope.powers.selected.id,
                id_surrounding : $scope.surr.selected.id,
                id_area : $scope.ar.selected.id,
                id_contact_as_owner : $scope.conowner.selected.id,
                id_caretaker : $scope.concare.selected.id
            };
            station.updateStation(object);
        
            $timeout(function () {
                $state.go('home.profile');
            }, 110);
            
            /*station.updateStation($scope.stationUpdateName);
            var temp = $scope.stationUpdateName;
            $scope.stationUpdateName = temp;*/
        };


        $scope.addStation = function () {
            var object = { 
                name: $scope.sname,
                marker: $scope.smarker,
                permanent_marker: $scope.spermanent_marker,
                lat: $scope.slat,
                lon: $scope.slon,
                altitude : $scope.saltitude,
                description : $scope.sdescription,
                date_from : $scope.sdate_from,
                date_to : $scope.sdate_to,
                id_network : $scope.data.networkSelected.id,
                id_zone : $scope.data.zoneSelected.id,
                id_station_type : $scope.data.typeSelected.id,
                id_contact_as_contact : $scope.data.contactSelected.id,
                id_contact_as_data_owner : $scope.data.contactDataSelected.id,
                id_power_generation_type : $scope.data.powerSelected.id,
                comment : $scope.scomment,
                id_area : $scope.data.areaSelected.id,
                id_surrounding : $scope.data.surroundingSelected.id,
                id_contact_as_owner : $scope.data.contactOwnerSelected.id,
                id_landscape: $scope.data.selectedOption.id,
                is_active : $scope.sis_active,
                id_caretaker : $scope.data.contactCareSelected.id,
                imageurl : $scope.simageurl

            };
           
            station.addStation(object);
            $timeout(function() {
               var temp = station.getAllStations();
               $scope.stations = temp;
            }, 110);

        };

        $scope.data = {    
            availableOptions: landscape.getAllLandscape(),
            selectedOption: {id: landscape.id, landscape: landscape.landscape}, //This sets the default value of the select in the ui

            networkAvailable : network.getAllNetwork(),
            networkSelected : {id: network.id, name: network.name},

            zoneAvailable : zone.getZone(),
            zoneSelected : {id: zone.id, name: zone.name},

            typeAvailable : type.getAllType(),
            typeSelected: {id: type.id, name: type.name}, 

            contactAvailable : contact.getAllContacts(), 
            contactSelected : {id: contact.id, name: contact.name}, 

            contactDataAvailable : contact.getAllContacts(), 
            contactDataSelected : {id: contact.id, name: contact.name}, 

            powerAvailable : power_generation_type.getPowerGenType(),
            powerSelected : {id: power_generation_type.id, name: power_generation_type.name},

            areaAvailable : area.getArea(),
            areaSelected : {id: area.id, area: area.area}, 

            surroundingAvailable : surrounding.getSurroundings(),
            surroundingSelected : {id: surrounding.id, surroundings : surrounding.surroundings},

            contactOwnerAvailable : contact.getAllContacts(), 
            contactOwnerSelected : {id: contact.id, name: contact.name},

            contactCareAvailable : contact.getAllContacts(), 
            contactCareSelected : {id: contact.id, name: contact.name}

        };

        $scope.isActive = function ( index ) {
            // index er array staðsetning..
            var deleteStation = $scope.stations[index];
            var object = {
                id     : deleteStation.id,
                active : 'FALSE'
            };

            station.isActive(object);

            $timeout(function() {
                $scope.stations = station.getAllStations();
            }, 110);
        };

        $scope.uploadStationPic = function(file) {

            $scope.simageurl = '/image/stations/' + $scope.picFile.name
            file.upload = Upload.upload({
                url: 'api/stationImage',
                data: {stations: file, username: $scope.username}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, 
            function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, 
            function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

       
        $scope.addStationComments = function () {
            var object = {
                comment    : $scope.comment,
                station_id : $scope.stationUpdateName.id,
                user_id    : $scope.currentUser
            };
            stationComments.addStationComments(object).success(function (addID) { 
                $timeout(function() {
                    $scope.stationComment = stationComments.getStationCommentByStationId($scope.stationUpdateName.id);
            
            });
                $scope.comment = ''; 
                $state.go('home.profile', {id: addID.station_id});}, 200);
        };






        
 }]);