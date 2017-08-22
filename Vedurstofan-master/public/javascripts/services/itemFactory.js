app.factory('item', ['$http', '$window', function ($http, $window) {
	var item = {};

	item.getDeviceByID = function (ID) {
        var devId = {};
        $http.get('/api/getItemById/'+ ID).success(function (data) {
            angular.copy(data, devId);
        });
        return devId;
    };
    item.getItemType = function () {
        var devId = [];
        $http.get('/api/getAllItemType').success(function (data) {
            angular.copy(data, devId);
        });
        return devId;
    };
    item.getDeviceInfo = function (ID) {
        var devId = {};
         $http.get('/api/getItemInfo/'+ ID).success(function (data) {;
            angular.copy(data, devId);
            //console.log(data);
        });
        return devId;
        
    };
    item.getAllItemCommentsByID = function (ID) {
        var returnMe = [];
         $http.get('/api/getAllItemCommentsByID/' + ID).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    item.addItemComment = function (object) {
        return $http.post('/api/addItemComments', object).success(function (data) {
            var comment = {};
            angular.copy(comment, data);
            return comment;
        }); 
    };
    item.addItemType = function (object) {
        return $http.post('/api/addItemType', object).success(function (data) {
            var comment = {};
            angular.copy(comment, data);
            return comment;
        }); 
    };
    item.updateItemStation = function (object) {
            var update = [];
        $http.put('/api/updateItemStation', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };
 	return item;
}]);