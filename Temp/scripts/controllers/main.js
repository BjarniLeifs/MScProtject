'use strict';

/**
 * @ngdoc function
 * @name ramesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ramesApp
 */
angular.module('ramesApp')
  .controller('MainCtrl', function ($scope, $location, $http) {
    
    // On sign in, add token to header. Retrieve token and 
    // User id. Should be retrieved from the header.
    var userID = 2;
    var reporttypeID = 1;

    var baseUrl = "http://localhost:3001";

    $http.get(baseUrl + "/api/reports/user/" + userID + "/")
      .then(function (response) {
        $scope.reports = response.data;
      });

    $scope.refresh = function () {
      $http.get(baseUrl + "/api/reports/user/" + userID + "/")
        .then(function (response) {
          $scope.reports = response.data;
        });
    }

    $scope.deleteReport = function (id) {
      $http.delete(baseUrl + "/api/reports/" + id)
        .then(function (response) {
          console.log("Success");
          $http.delete(baseUrl + "/api/reportsinfo/report/" + id)
            .then(function (response) {
              console.log("Success");
            }, function(response) {
              console.log("Error, something bad happened");
            });
          $scope.refresh();
        }, function (response) {
          console.log("Error, something bad happened");
        });
    }

    $scope.reportName = {
      "userID": 2,
      "reporttypeID": reporttypeID
    };

    $scope.info;

    $scope.save = function(reportName) {
      var rep = $http.post(baseUrl + "/api/reports", reportName);
      location.reload();
      csole.log('success' + rep.id);
    }

    $(document).ready (function(){
        $("#success-alert").hide();
        $("#succ").click(function showAlert() { 
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
            });
        });
    });
    

    // COLLAPSE =====================
    $scope.isCollapsed = false;

    $('.makeBorder').click(function () {
      console.log('in function');
      ('#roles{{report.id}}').click();
    })
  });
