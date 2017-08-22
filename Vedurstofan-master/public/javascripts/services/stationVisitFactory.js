/* Station Visit factory */ 
app.factory('stationVisit', ['$http', '$window', function ($http, $window) {
    var stationVisits = {};
   
    /* Get request */
    stationVisits.getAllStationVisit = function () {
    	var returnMe = [];
    	$http.get('/api/getAllStationVisit').success(function (data) {
    		angular.copy(data, returnMe);
    	});
    	return returnMe;
    };
     stationVisits.getVisitById = function (id) {
        var returnMe = {};
        $http.get('/api/getVisitById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };   
    /* get for Visit Catagory */
    stationVisits.getAllVisitCatagory = function () {
        var returnMe = [];
        $http.get('/api/getAllVisitCatagory').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    stationVisits.getVisitCatagoryById = function (id) {
        var returnMe = [];
        $http.get('/api/getVisitCatagoryById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* get for Visit date */
    stationVisits.getAllVisitDate = function () {
        var returnMe = [];
        $http.get('/api/getAllVisitDate').success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    stationVisits.getVisitDateById = function (id) {
        var returnMe = [];
        $http.get('/api/getVisitDateById/'+id).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    /* Post request */
    stationVisits.addStationVisit = function (object) {
    	return $http.post('/api/addStationVisit', object).success(function (data) {
            var added = [];
    		angular.copy(data, added);
            return added;
    	});      
    };
    /* Post for Visit Catagary */
    stationVisits.addVisitCatagory = function (object) {
        return $http.post('/api/addVisitCatagory', object).success(function (data) {
            var added = [];
            angular.copy(data, added);
            return added;
        });    
    };  
     /* Post for next visit date */
    stationVisits.addVisitDate = function (object) {
        return $http.post('/api/addVisitDate', object).success(function (data) {
            var added = [];
            angular.copy(data, added);
            return added;
        });
        
    };  
     /* Put requests */
    stationVisits.updateStationVisit = function (object) {
        var update = [];
        $http.put('/api/updateStationVisit', object).success(function (data) {
            angular.copy(update, data);
        });
        return update;
    };  
    stationVisits.updateVisitCatagory = function (object) {
       var update = [];
        $http.put('/api/updateVisitCatagory', object).success(function (data) {     
            angular.copy(update, data);
        });
        return update;
        
    };  
    stationVisits.updateVisitDate = function (object) {
        var update = [];
        $http.put('/api/updateVisitDate', object).success(function (data) {  
            angular.copy(update, data);
        });
        return update;   
    }; 
    return stationVisits;
}]);