app.controller('ItemTypeCtrl', ['$scope', '$timeout','item', 'contact', 'device','attribute', 'station', 'stationitem', 'auth','$state','$stateParams', 'Upload',
  function ($scope, $timeout, item, contact, device, attribute, station, stationitem, auth, $state, $stateParams, Upload) {
 
 
    $scope.allitemtypes = item.getItemType();
    $scope.typename = {};


    $scope.addItemType = function () {
      var object = {
        name : $scope.typename.name
      };
      item.addItemType(object).error(function (error) {
        $scope.error = error;
      });
      $scope.typename = '';
      $scope.allitemtypes = item.getItemType();
    }; 
  }]);