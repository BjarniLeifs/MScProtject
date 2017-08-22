 /* Antenna Factory */

app.factory('attribute', ['$http', '$window', function ($http, $window) {
    var attribute = {};

    attribute.getAllAttributes = function (model) {
        var model = [];
        $http.get('/api/getAllAttributes').success(function (data) {
            angular.copy(data, model);
        });
        return model;
    };
    attribute.addAttributes = function (object) {
        console.log(object);
        return $http.post('/api/addItemAttribute', object).success(function (data) {
            returnMe = {};
            angular.copy(data, returnMe);
            //console.log(returnMe);
            return returnMe;
        });
    };
    attribute.getAllItemAttributes = function (ID) {
        var returnMe = [];
        $http.get('/api/getAllItemAttribute/' + ID).success(function (data) {
            angular.copy(data, returnMe);            
        });
        
        return returnMe;
    };
    attribute.addAttribute = function (object) {  
        return $http.post('/api/addAttribute', object).success(function (data){
            var returnMe = [];
            angular.copy(data, returnMe);
            return returnMe;
        });
    };
    
    return attribute;
}]);