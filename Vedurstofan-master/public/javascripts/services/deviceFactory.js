/* DeviceFactory*/

app.factory('device', ['$http', '$window', function ($http, $window) {
    var devices = {};
    /* Get requests */
    devices.getAllDevices = function () {
        var temp = [];
        $http.get('/api/getAllItems').success(function (data) {
            angular.copy(data, temp);
        });
        return temp;
    };
    devices.getDeviceByName = function (name) {
        var name = [];
        $http.get('/api/getDeviceByName/'+ name).success(function (data) {
            angular.copy(data, name);
        });
        return name;
    };
    devices.getDeviceByModel = function (model) {
        var model = [];
        $http.get('/api/getDeviceByName/'+ model).success(function (data) {
            angular.copy(data, model);
        });
        return model;
    };
     devices.getDeviceBySerial = function (serialnumber) {
        var serial = [];
        $http.get('/api/getDeviceBySerial/'+ serialnumber).success(function (data) {
            angular.copy(data, serial);
        });
        return serial;
    };
    devices.getDeviceByID = function (ID) {
        console.log(ID);
        var devId = {};
        $http.get('/api/getItemById/'+ ID).success(function (data) {
            angular.copy(data, devId);
        });
        return devId;
    };
    devices.getDeviceInfo = function (ID) {
        var devId = {};
        $http.get('/api/getItemInfo/'+ ID).success(function (data) {
            angular.copy(data, devId);
        });
        return devId;
    };
    devices.getDeviceByCatagory = function (catagory) {
        var devCatagory = [];
        $http.get('/api/getDeviceByCatagory/'+ catagory).success(function (data) {
            angular.copy(data, catagory);
        });
        return devCatagory;
    };
     devices.getDeviceByType = function (type) {
        var devType = [];
        $http.get('/api/getDeviceByType/'+ type).success(function (data) {
            angular.copy(data, type);
        });
        return devType;
    };
    devices.getDeviceByStatus = function (status) {
        var devStatus = [];
        $http.get('/api/getDeviceByStatus/'+ status).success(function (data) {
            angular.copy(data, devStatus);
        });
        return devStatus;
    };
    devices.getAllItemStatus = function () {
        var destination = [];
        $http.get('/api/getAllItemStatus').success(function (data) {
            angular.copy(data, destination)
        });
        return destination;
    };
    /* Post requests */
    devices.addDevice = function (object) {  
        return $http.post('/api/addItem', object).success(function (data) {
            var returnMe = [];
            angular.copy(data, returnMe);
            return returnMe;
        });
    };
    devices.addItemStatus = function (object) {       
        return $http.post('/api/addItemStatus', object).success(function (data) {
            var returnMe = {};
            angular.copy(data, returnMe); 
            return returnMe;
        });  
    };
    devices.getAllActiveItems = function () {
        var returnMe = [];
         $http.get('/api/getAllActiveItems').success(function (data) {
            //console.log(data);
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
     devices.getAllTypes = function () {
        var returnMe = [];
         $http.get('/api/getAllItemType').success(function (data) {
            angular.copy(data, returnMe);
        });
        //console.log("factory return" + returnMe);
        return returnMe;
    };
    devices.getAllAttributes= function () {
        var returnMe = [];
         $http.get('/api/getAllAttributes').success(function (data) {
            angular.copy(data, returnMe);
            //console.log(returnMe);
        });
        return returnMe;
    };
    devices.deleteItem = function (object) {
        return $http.put('/api/deleteItem', object).error(function (error) {
            $scope.error = error;
        });
    };
    devices.updateItem = function (object) {
        var update = [];
        $http.put('/api/updateItem', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };
    devices.addItemComment = function (object) {
        return $http.post('/api/addItemComments', object).success(function (data) {
            var comment = {};
            angular.copy(comment, data);
            return comment;
        });       
    };
    devices.addStationItem = function (object) {
    return $http.post('/api/addStationItem', object).success(function (data) {
            var comment = {};
            angular.copy(comment, data);
            return comment;
        });
    };
    return devices;
}]);