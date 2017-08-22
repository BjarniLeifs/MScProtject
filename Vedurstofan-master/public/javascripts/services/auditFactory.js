app.factory('audit', ['$http', '$window', 'auth', 
    function ($http, $window, auth) {
        var audit= [];

        audit.getAllHistory = function () {
        	var returnMe = [];
        	 $http.get('/api/allhistory').success(function (data) {
        		angular.copy(data, returnMe);
            });
        	 return returnMe;
        }

        audit.getAllUserHistory = function (id) {
        	var returnMe = [];
        	 $http.get('/api/getHistorybyUserID/' + id).success(function (data) {
        		angular.copy(data, returnMe);
            });
        	 return returnMe;
        }
    
    return audit;
}]);