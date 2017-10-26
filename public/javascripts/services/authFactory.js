//* AuthenticationFactory */

app.factory('authFactory', ['$http', '$window', '$location', 'configFactory', 
    function ($http, $window, $location, configFactory) {
    var auth = {};
    var baseUrl = configFactory.getHttpUrl();

    auth.saveToken = function (token) {
        $window.localStorage['appToken'] = token;
        //console.log(token);
    };

    auth.getToken = function () {
        return $window.localStorage['appToken'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob( token.split('.')[1]) );

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    auth.isAdmin = function() {
  
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        var scopes = payload.scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (scopes[i] === 'admin') {
                return true;
            }
        }
        return false;

    };

    auth.currentUser = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    auth.currentUserId = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.id;
        }
    };
    auth.currentName = function() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.name;           
        }
    };


    auth.register = function (user) {
        var returnMe;
        $http.post(baseUrl+'/api/auth/register', user).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };

    auth.logIn = function (user) {
        var object = $http.post(baseUrl+'/api/auth/login', user).success(function (data) {
            auth.saveToken(data.token);
        });
        return object;
    };


    auth.logOut = function () {
        $window.localStorage.removeItem('appToken');
        $location.path('/main');
    };

    auth.resetPassword = function (email) {
        var returnMe;

        $http.post(baseUrl+'/api/auth/forgotPassword', {  email: email }).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    auth.newPassword = function (object) {
        var returnMe;
        $http.post(baseUrl+'/api/auth/reset/'+object.token, object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    return auth;
}]);