/* StationFactory*/

app.factory('contact', ['$http', '$window', function ($http, $window) {
    var contacts = {};
  
    /* Get requests */
    contacts.getAllContacts =  function () {
        var returnMe = [];
        $http.get('/api/getAllContacts').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    contacts.getContactByName = function (name) {
        var returnMe = [];
        $http.get('/api/getContactByName/'+name).success(function (data) {
            angular.copy(data, returnMe);
            console.log(data);
        });
        return returnMe;
    };
    /* Post requests */
    contacts.addContact = function (object) {
        var added = [];
        $http.post('/api/addContact', object).success(function (data) {
            angular.copy(data, added);
        });
        return added;
    };
    return contacts;
}]);