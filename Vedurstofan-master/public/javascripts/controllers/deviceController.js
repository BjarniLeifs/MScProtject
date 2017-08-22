/* DeviceController*/

app.controller('DeviceCtrl', ['$scope', '$timeout', 'attribute', 'contact','item', 'device','attribute', 'station', 'stationitem', 'auth', 'ngDialog','$state','$stateParams', 'Upload',
  function ($scope, $timeout, attribute, contact, item, device, attribute, station, stationitem, auth, ngDialog, $state, $stateParams, Upload) {

    $scope.isAdmin = auth.isAdmin();
    $scope.isMod = auth.isMod();
    $scope.isWriter = auth.isWriter();
    $scope.device = {};
    $scope.allItemStatus = device.getAllItemStatus();
    $scope.devices = device.getAllActiveItems();
    $scope.itemcomment = {};
    $scope.currentUser = auth.currentUserId();
    $scope.itemID = {};
    $scope.stationAvailable = station.getAllStations();
    $scope.attributesAdd = [];
    $scope.itemAttributes = [];
    $scope.showattribute = attribute.getAllAttributes();
    $scope.attributeadd ={};
    
    $scope.choices = [];

    $scope.clickToOpen = function () {
        ngDialog.open({ template: 'views/test.html'});
    };
    //$scope.device.imageUrl = '/image/items/undefined.png'
    $scope.data = {
            attributesAvailable : attribute.getAllAttributes()
        };

        $scope.addattributes = function () {
            attribute.addAttributes($scope.attributesAdd).success(function (data) {
              $scope.allattributes = attribute.getAllAttributes($scope.itemID);
              $state.go('home.itemprofile', {id :$scope.itemID});
            });
        };

        $scope.addNewChoice = function() {
            $scope.attributesAdd.push({ attid: $scope.data.attributesSelected.id,
                                        name: $scope.data.attributesSelected.name,
                                        value: $scope.attributeadd.value,
                                        itemID : $scope.itemID});
        };

        $scope.removeChoice = function() {
            var lastItem = $scope.attributesAdd.length-1;
            $scope.attributesAdd.splice(lastItem);
        };

          $scope.addattributesExtra = function () {
            attribute.addAttributes($scope.attributesAdd).success(function (data) {
              $scope.allattributes = attribute.getAllAttributes($stateParams.id);
              $state.go('home.itemprofile', {id :$stateParams.id});
            });
        };

        $scope.addNewChoice2 = function() {
            $scope.attributesAdd.push({ attid: $scope.data.attributesSelected.id,
                                        name: $scope.data.attributesSelected.name,
                                        value: $scope.attributeadd.value,
                                        itemID : $stateParams.id});
        };

        $scope.removeChoice2 = function() {
            var lastItem = $scope.attributesAdd.length-1;
            $scope.attributesAdd.splice(lastItem);
        };

        $scope.addNewAttribute = function() {
            var object = {
                name : $scope.attrName
            };
            attribute.addAttribute(object);
            $timeout(function() {
               $scope.showattribute = attribute.getAllAttributes();
            }, 110);
            $scope.attrName = '';            
    }
   $scope.addDevice = function () {
    var object = { 
                    idItemType: $scope.data.itemSelected.id,
                    idProducer: $scope.data.contactProducerSelected.id,
                    idOwner: $scope.data.contactOwnerSelected.id,
                    comment: $scope.device.comment,
                    idItemStatus : $scope.data.statusSelected.id,
                    imageUrl : $scope.device.imageUrl   
                  };
    
    //console.log(object);
    device.addDevice(object).success(function (data) {
      $scope.itemID = data[0].id;
    });
  };

    $scope.additemstation = function() {
    var object = {
      itemid : $scope.itemID,
      newstation : $scope.device.station.id
    };
    item.updateItemStation(object);
    var object2 = {
                       itemid : $scope.itemID,
                       newstation : $scope.device.station.id
                    };
      stationitem.addStationItem(object2).success(function (data) {
      console.log(data);
      //$state.go('home.addAttribute', {id: $scope.deviceId.iid});
    });
  };

    $scope.addItemStatus = function () {
      var object = {
        name : $scope.itemStatusName
      };
      device.addItemStatus(object).error(function (error) {
        $scope.error = error;
      });
      $scope.itemStatusName = '';
      $scope.allItemStatus = device.getAllItemStatus();
    }; 

    $scope.itemDelete = function ( idx ) {
      var delitem = $scope.devices[idx];
      //console.log(delitem);
      var object = {
        id : delitem.iid,
        status : 4
      };
      var object2 = {
        itemid : delitem.iid,
        oldstation : delitem.stid
      };
      device.deleteItem(object);
      $timeout(function() {
               $scope.devices = device.getAllActiveItems();
            }, 110);
      stationitem.updateStationItem(object2);

    }; 
    $scope.addDevice = function () {
      var object = { 
                      idItemType: $scope.data.itemSelected.id,
                      idProducer: $scope.data.contactProducerSelected.id,
                      idOwner: $scope.data.contactOwnerSelected.id,
                      comment: $scope.device.comment,
                      idItemStatus : $scope.data.statusSelected.id,
                      imageUrl : $scope.device.imageUrl   
                    };
      
      //console.log(object);
      device.addDevice(object).success(function (data) {
        $scope.itemID = data[0].id; 
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
    //console.log($scope.data.stationSelected);

   

    
   $scope.uploadItemPic = function(file) {

      $scope.device.imageUrl = '/image/items/' + $scope.picFile.name
      file.upload = Upload.upload({
          url: '/api/itemImage',
          data: {items: file, username: $scope.username}
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



 }]);