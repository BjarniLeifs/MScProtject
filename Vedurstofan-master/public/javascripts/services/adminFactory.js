/* AdminFactory */

app.factory('admin', ['$http', '$window', 'auth', 
    function ($http, $window, auth) {
        var admin = {};

        admin.changeUserPassword = function (user) {

        	$http.put('/api/adminChangeUserPassword', user).success(function (data) {
        		/* Return for message if any. */
            });
        }
    
    return admin;
}]);