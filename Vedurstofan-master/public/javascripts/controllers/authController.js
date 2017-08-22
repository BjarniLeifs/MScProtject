/* AuthController*/

app.controller('AuthCtrl', ['$scope', '$state', 'auth', '$stateParams', '$location', 'Upload', '$timeout','userFact',
    function ($scope, $state, auth, $stateParams, $location, Upload, $timeout, userFact) {

        $scope.user = {
            isadmin     : false, 
            isactive    : false, 
            isreader    : false, 
            iswriter    : false, 
            ismoderator : false
        };
        $scope.pass = {};
        $scope.email = '';
        $scope.user.photoUrl = '/image/users/undefined.png';

        $scope.backgroundImages = {
                'background-image': 'url(/../image/bg-1.jpg)',
                'position': 'absolute',
                'top': 0,
                'bottom': 0,
                'left': 0,  
                'right': 0,
                'background-repeat': 'no-repeat',
                'background-size': 'cover'

        };
        
        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $state.go('home.welcome');
            });
        };
        $scope.resetPassword = function () {
            auth.resetPassword($scope.email)

            $state.go('home');
            
            $scope.email = '';
        };

        $scope.newPassword = function () {
            if ($scope.pass.new === $scope.pass.confirm) {
                var object = {
                    token           : $stateParams.token,
                    password        : $scope.pass.new,
                    confirmPassword : $scope.pass.confirm
                };
                auth.newPassword(object);
                $state.go('login');
            } else {
                $scope.error = "The password did not match";
            }
            $scope.pass = {};
        };
        $scope.uploadUserPic = function(file) {

            $scope.user.photoUrl = '/image/users/' + $scope.picFile.name
            file.upload = Upload.upload({
                url: '/api/userImage',
                data: {users: file, username: $scope.username}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, 
            function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, 
            function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
}]);