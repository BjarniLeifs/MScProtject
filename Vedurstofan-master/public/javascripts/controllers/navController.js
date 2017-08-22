/* NavController */
app.controller('NavCtrl', ['$scope', 'auth',
    function ($scope, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser();
        $scope.imageurl = auth.imageurl();
        $scope.logOut = auth.logOut;
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();


        $scope.navMenu = {
 
            name: auth.currentUser(),
           
       
        };
        
     

    }
]);