'use strict';

/**
 * @ngdoc overview
 * @name ramesApp
 * @description
 * # ramesApp
 *
 * Main module of the application.
 */
angular
  .module('ramesApp', [
    'ngRoute',
  ])
  .config(function ($routeProvider, $locationProvider) {
  console.log('foobar');
  $locationProvider.hashPrefix('');
  $routeProvider
      .when('/', {
        // front page = views/main.html
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
        //controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
        //controllerAs: 'about'
      })

      .when('/aboutCreator', {
        templateUrl: 'views/aboutcreator.html',
        controller: 'AboutcreatorCtrl'
        //controllerAs: 'aboutCreator'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
        //controllerAs: 'contact'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
        //controllerAs: 'settings'
      })
      .when('/reports/:reportID', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
        //controllerAs: 'report'
      })
      .when('/newReport', {
        templateUrl: 'views/newreport.html',
        controller: 'NewreportCtrl'
        //controllerAs: 'newReport'
      })
      .when('/pdfReport', {
        templateUrl: 'views/pdfReport.html',
        controller: 'pdfReportMaker'
      })
      .otherwise({
        redirectTo: '/'
      });



  });
