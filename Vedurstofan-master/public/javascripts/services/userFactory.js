/* UserFactory*/

app.factory('userFact', ['$http', '$window', function ($http, $window) {
    var userFact = {};
   
    userFact.getAllUsers = function () {
    	var returnMe = [];
    	$http.get('/api/getAllUsers').success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;	
    };
    userFact.getUserById = function (id) {
        var returnMe = [];
        $http.get('/api/getUserById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    userFact.getUserByName = function (name) {
        var returnMe = {};
        $http.get('/api/getUserByName/'+name).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    userFact.getUserByUsername = function (username) {
        var returnMe = {};
        $http.get('/api/getUserByUsername/'+username).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    userFact.updateUser = function (object) {
        var addMe = [];
        $http.put('/api/updateUser', object).success(function (data) {
            angular.copy(addMe, data);
        });
        return addMe;
    };
    userFact.updateUserPassword = function (object) {
        var updateMe = [];
        $http.put('/api/updateUserPassword', object).success(function (data) {
            angular.copy(updateMe, data);
        });
        return updateMe;
    };
    return userFact;
}]);