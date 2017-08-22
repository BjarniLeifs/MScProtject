app.controller('ItemCtrl', ['$scope', '$timeout','item', 'contact', 'device','attribute', 'station', 'stationitem', 'auth','$state','$stateParams', 'Upload',
  function ($scope, $timeout, item, contact, device, attribute, station, stationitem, auth, $state, $stateParams, Upload) {
 
    $scope.device = {};
    $scope.deviceId= item.getDeviceByID($stateParams.id);
    $scope.deviceinfo = item.getDeviceInfo($stateParams.id);
    $scope.allitemcomments = item.getAllItemCommentsByID($stateParams.id);
    $scope.itemattributes = attribute.getAllItemAttributes($stateParams.id);
    $scope.stationHistory = stationitem.getStationItemHistory($stateParams.id);
    $scope.devices = device.getAllActiveItems();
    $scope.itemTypeOptions = device.getAllTypes();
    $scope.producerAvailable = contact.getAllContacts(); 
    $scope.ownerAvailable = contact.getAllContacts();
    $scope.statusAvailable = device.getAllItemStatus(); 
    $scope.stationAvailable = station.getAllStations();
    $scope.currentUserId = auth.currentUserId();
    $scope.itemtype = {};
    $scope.producer ={};
    $scope.owner = {};
    $scope.status = {};
    $scope.station = {};
    
    
    
    
    $timeout(function()
     {
      var itemTypeID;
      for (var i = 0; i< $scope.itemTypeOptions.length; i++) {
        if ($scope.itemTypeOptions[i].name === $scope.deviceId.itname)
           itemTypeID = $scope.itemTypeOptions[i].id
      }

      var ProducerID;
      for (var i = 0; i< $scope.producerAvailable.length; i++) {
        if ($scope.producerAvailable[i].name === $scope.deviceId.cname)
           ProducerID = $scope.producerAvailable[i].id
      }

      var ownerID;
      for (var i = 0; i< $scope.ownerAvailable.length; i++) {
        if ($scope.ownerAvailable[i].name === $scope.deviceId.cdname)
           ownerID = $scope.ownerAvailable[i].id
      }

      var statusID;
      for (var i = 0; i< $scope.statusAvailable.length; i++) {
        if ($scope.statusAvailable[i].name === $scope.deviceId.sname)
           statusID = $scope.statusAvailable[i].id
      }

      var stationID;
      for (var i = 0; i< $scope.stationAvailable.length; i++) {
        if ($scope.stationAvailable[i].name === $scope.deviceId.stname)
           stationID = $scope.stationAvailable[i].id
      }

      $scope.itemtype.selected = { 
      name: $scope.deviceId.itname,
      id : itemTypeID
      };

      $scope.producer.selected = {
        name : $scope.deviceId.cname,
        id : ProducerID
      };

      $scope.owner.selected = {
        name : $scope.deviceId.cdname,
        id : ownerID
      };

      $scope.status.selected = {
        name : $scope.deviceId.sname,
        id : statusID
      };

      $scope.station.selected = {
        name : $scope.deviceId.stname,
        id : stationID
      };
    }, 200);


    $scope.updateitem = function () {
             var object = {
              id_item_type : $scope.itemtype.selected.id,
              id_contact_as_producer : $scope.producer.selected.id,
              id_contact_as_owner : $scope.owner.selected.id,
              comment : $scope.deviceinfo.comment,
              id_item_status : $scope.status.selected.id,
              imageurl : $scope.deviceinfo.imageurl,
              station : $scope.station.selected.id,
              id : $scope.deviceId.iid
             };
             
            if(object.station === $scope.deviceinfo.id_station){
                device.updateItem(object);
                var temp = item.getDeviceInfo(object.id);
                $timeout(function() {
               $scope.deviceinfo = item.getDeviceInfo(object.id);
            }, 110);
                $state.go('home.itemprofile', {id :object.id});
              }else{
                      var object2 = {
                        oldstation : $scope.deviceinfo.id_station,
                        newstation : object.station,
                        itemid     : object.id
                      };
                      stationitem.updateStationItem(object2); //virkar, uppfæriri stationitem
                      device.updateItem(object);
                      item.updateItemStation(object2);
                      stationitem.addStationItem(object2); //virkar, uppfærir station item
                      $state.go('home.itemprofile', {id :object.id});

              }
            
        };

      $scope.addItemComment = function() {
      var object = {
        comment : $scope.device.comment,
        idItem : $scope.deviceId.iid,
        idUser : $scope.currentUserId
      };
      //console.log(object);
      item.addItemComment(object).success(function (data) {
          //console.log('data ' + data);
          $state.go('home.itemprofile', {id :$scope.deviceId.iid});
      })
    };

    $scope.additemstation = function() {
      var object = {
        itemid : $scope.deviceId.iid,
        newstation : $scope.device.station.id
      };
      item.updateItemStation(object);
      var object2 = {
                         itemid : $scope.deviceId.iid,
                         newstation : $scope.device.station.id
                      };
        stationitem.addStationItem(object2).success(function (data) {
        $state.go('home.addAttribute', {id: $scope.deviceId.iid});
      });
    };

    $scope.data = {    
            itemTypeOptions: device.getAllTypes(),
            itemSelected: {id: device.id, type: device.name},
            contactOwnerAvailable : contact.getAllContacts(), 
            contactOwnerSelected : {id: contact.id, name: contact.name},
            contactProducerAvailable : contact.getAllContacts(), 
            contactProducerSelected : {id: contact.id, name: contact.name},
            statusAvailable : device.getAllItemStatus(),
            statusSelected : {id: status.id, name: status.name},  
            stationAvailable : station.getAllStations(),
            stationSelected : {id : station.id}
    };
    //console.log($scope.data.itemTypeOptions);
  }]);