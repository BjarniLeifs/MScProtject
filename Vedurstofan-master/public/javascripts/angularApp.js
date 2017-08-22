/* Angular routing and app declaration */

var app = angular.module('weatherApp', ['ui.router','ngFileUpload','ngDialog','ngSanitize','ui.select','angularUtils.directives.dirPagination', 'ngMessages']);

app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
    /* Login, forgot and reset password state starts */
        .state('login', {
            url: '/login',
            templateUrl: 'views/partial/authenticate/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {
               if (auth.isLoggedIn()) {
                    $state.go('home.welcome');
               }
            }]
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/partial/authenticate/forgotpassword.html',
            controller: 'AuthCtrl',
        })
        .state('reset', {
            url: '/reset/:token',
            templateUrl: 'views/partial/authenticate/reset.html',
            controller: 'AuthCtrl',

        })
    /* Login, forgot and reset password state ends */
    /* Main page state starts */
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {
                if (!auth.isLoggedIn()) {
                    $state.go('login');
                } 

            }]
        })
    /* Front page state starts */
        .state('home.welcome', {
            url: '/welcome',
            templateUrl: 'views/partial/frontpage/welcome.html',
            controller: 'WelcomeCtr',
        })
    /* Front page state ends */
    /* Station states start */
        .state('home.station', {
            url: '/station',
            templateUrl: 'views/partial/station/station.html',
            controller: 'StationCtrl',
        })
        .state('home.edit', {
            url: '/edit/:name',
            templateUrl: 'views/partial/station/edit.html',
            controller: 'StationCtrl',
        })
        .state('home.profile', {
            url: '/profile/:name',
            templateUrl: 'views/partial/station/stationProfile.html',
            controller: 'StationCtrl',
        })
        .state('home.stationtype', {
            url: '/stationtype',
            templateUrl: 'views/partial/station/stationtype.html',
            controller: 'TypeCtrl',
        })
        .state('home.editStationtype', {
            url: '/editStationtype/:id',
            templateUrl: 'views/partial/station/editStationType.html',
            controller: 'TypeCtrl',
        })
    /* Station states ends */
    /* Station visit starts */
    .state('home.stationVisit', {
            url: '/stationVisit',
            templateUrl: 'views/partial/stationVisit/stationVisits.html',
            controller: 'StationVisitCtrl',
        })
    .state('home.visitname', {
            url: '/stationVisit/:id',
            templateUrl: 'views/partial/stationVisit/visitByStation.html',
            controller: 'StationVisitByIdCtrl',
        })
    .state('home.visitById', {
            url: '/name/:id',
            templateUrl: 'views/partial/stationVisit/profileAfterAdd.html',
            controller: 'StationVisitByIdCtrl',
        })
    .state('home.addStationVisit', {
            url: '/addvisit',
            templateUrl: 'views/partial/stationVisit/addStationVisit.html',
            controller: 'StationVisitCtrl',
        })
    .state('home.profileVisit', {
            url: '/profileVisit/:id',
            templateUrl: 'views/partial/stationVisit/profileAfterAdd.html',
            controller: 'StationVisitByIdCtrl',
        })
    .state('home.editVisit', {
            url: '/editvisit/:id',
            templateUrl: 'views/partial/stationVisit/editStationVisit.html',
            controller: 'StationVisitCtrl',
        })
    /* Station visits ends */  
    /* Area states start */
        .state('home.area', {
            url: '/area',
            templateUrl: 'views/partial/area/area.html',
            controller: 'AreaCtrl',
        })
        .state('home.updateArea', {
            url: '/updateArea/:area',
            templateUrl: 'views/partial/area/updateArea.html',
            controller: 'AreaCtrl',
        })
    /* Area state ends */
    /* Landscape states start */
        .state('home.landscape', {
            url: '/landscape',
            templateUrl: 'views/partial/landscape/landscape.html',
            controller: 'LandscapeCtrl',
        })
        .state('home.editlandscape', {
            url: '/editlandscape/:landscape',
            templateUrl: 'views/partial/landscape/editLandscape.html',
            controller: 'LandscapeCtrl',
        })
    /* Landscape state ends */
    /* Surrounding states start */
        .state('home.surrounding', {
            url: '/surrounding',
            templateUrl: 'views/partial/surrounding/surrounding.html',
            controller: 'SurroundingCtrl',
        })
        .state('home.editSurrounding', {
            url: '/editsurrounding/:surroundings',
            templateUrl: 'views/partial/surrounding/editSurroundings.html',
            controller: 'SurroundingCtrl',
        })
    /* Surrounding state ends */
    /* Antenna states start */
        .state('home.antenna', {
            url: '/antenna',
            templateUrl: 'views/partial/antenna/antenna.html',
            controller: 'AntennaCtrl'
        })
        .state('home.editAntenna', {
            url: '/editantenna/:name',
            templateUrl: 'views/partial/antenna/editAntenna.html',
            controller: 'AntennaCtrl'
        })
    /* Antenna state ends */
    /* Device state starts */
        .state('home.alldevices', {
            url: '/alldevices',
            templateUrl: 'views/partial/devices/devices.html',
            controller: 'DeviceCtrl'
        })
        .state('home.itemprofile', {
            url: '/device/:id',
            templateUrl: 'views/partial/devices/profiledevice.html',
            controller: 'ItemCtrl'
        })
        .state('home.itemprofileshow', {
            url: '/addeddevice/:id',
            templateUrl: 'views/partial/item/showaddeditem.html',
            controller: 'DeviceCtrl'
        })
        .state('home.itemedit', {
            url: '/edit-item/:id',
            templateUrl: 'views/partial/item/edit.html',
            controller: 'ItemCtrl'
        })
        .state('home.itemaddcomment', {
            url: '/additemcomment/:id',
            templateUrl: 'views/partial/item/additemcomment.html',
            controller: 'ItemCtrl'
        })
        .state('home.itemstation', {
            url: '/additemstation/:id',
            templateUrl: 'views/partial/item/addstation.html',
            controller: 'ItemCtrl'
        })
        .state('home.addnewattribute', {
            url: '/addnewattribute/',
            templateUrl: 'views/partial/attributes/addnewattribute.html',
            controller: 'DeviceCtrl'
        })
    /* Device states ends */
    /* User states starts */
        .state('home.users', {
            url: '/user',
            templateUrl: 'views/partial/user/users.html',
            controller: 'UserCtrl',
        })
        .state('home.name', {
            url: '/user/:name',
            templateUrl: 'views/partial/user/user.html',
            controller: 'UserCtrl',
        })
        .state('home.name.edit', {
            url: '/edit/:name',
            templateUrl: 'views/partial/user/edit.html',
            controller: 'UserCtrl',
        })
        .state('home.name.profile', {
            url: '/profile/:name',
            templateUrl: 'views/partial/user/profile.html',
            controller: 'UserCtrl',
        })
        .state('home.name.activity', {
            url: '/activity',
            templateUrl: 'views/partial/user/activity.html',
            controller: 'AuditCtrl',
        })
    /* User state ends */
    /* Network state starts */
        .state('home.network', {
            url: '/network',
            templateUrl: 'views/partial/network/network.html',
            controller: 'NetworkCtrl',
        })
        .state('home.editNetwork', {
            url: '/editNetwork/:name',
            templateUrl: 'views/partial/network/editNetwork.html',
            controller: 'NetworkCtrl',
        })
    /* Network state ends */
    /* Contact state starts */
        .state('home.contacts', {
            url: '/contact',
            templateUrl: 'views/partial/contacts/contacts.html',
            controller: 'ContactCtrl'

        })
        .state('home.cname', {
            url: '/contact/:name',
            templateUrl: 'views/partial/contacts/contact.html',
            controller: 'ContactCtrl'
        })
    /* Contact state ends */
    /* Item state starts */
        .state('home.itemstatus', {
            url: '/itemstatus',
            templateUrl: 'views/partial/item/itemstatus.html',
            controller: 'DeviceCtrl'
        })
    /* Item state ends */
    /* Zone state starts */
        .state('home.zone', {
            url: '/zone',
            templateUrl: 'views/partial/zone/zone.html',
            controller: 'ZoneCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]
        })
        .state('home.editZone', {
            url: '/editZone/:name',
            templateUrl: 'views/partial/zone/editZone.html',
            controller: 'ZoneCtrl',
        })
    /* Zone state ends */
    /* PowerGenType state starts */
        .state('home.pgt', {
            url: '/powergentype',
            templateUrl: 'views/partial/powergentype/powergentype.html',
            controller: 'PowerGenTypeCtrl',
        })
        .state('home.editpgt', {
            url: '/editpgt/:name',
            templateUrl: 'views/partial/powergentype/editPowergentype.html',
            controller: 'PowerGenTypeCtrl',
        })
    /* PowerGenType state ends */
    /* Attribute state starts*/
        .state('home.addAttribute', {
            url: '/addattribute/:id',
            templateUrl: 'views/partial/attributes/addattributes.html',
            controller: 'DeviceCtrl'
        })

    /* Item type state starts*/
    .state('home.addItemType', {
            url: '/additemtype/',
            templateUrl: 'views/partial/item/itemtype.html',
            controller: 'ItemTypeCtrl'
        });

        $urlRouterProvider.otherwise('login');
    }
]);
