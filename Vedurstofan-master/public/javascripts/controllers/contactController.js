/* Contact Controller*/

app.controller('ContactCtrl', ['$scope', 'contact', '$state', '$stateParams','auth', 'Upload', '$timeout',
    function ($scope, contact, $state, $stateParams, auth, Upload, $timeout) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
        $scope.contacts = contact.getAllContacts();
        $scope.contactInfo = contact.getContactByName($stateParams.name);
        $scope.usernameAdder = auth.currentUser();
        $scope.photoUrl = '/image/contacts/undefined.png';
        $scope.addContact = function () {
            var object = {
                name     : $scope.name, 
                title    : $scope.title, 
                company  : $scope.company, 
                email    : $scope.email,
                phone    : $scope.phone, 
                gsm      : $scope.gsm, 
                www      : $scope.www, 
                comment  : $scope.comment, 
                imageurl : $scope.photoUrl
            };

            contact.addContact(object);
            
            /* Clear data for view */
            $scope.photoUrl = '/image/contacts/undefined.png';
            $scope.name = ''; 
            $scope.title = ''; 
            $scope.company = ''; 
            $scope.email = ''; 
            $scope.phone = ''; 
            $scope.gsm = ''; 
            $scope.www = '';  
            $scope.comment = ''; 
            $timeout(function() {
               var temp = contact.getAllContacts();
                $scope.contacts = temp;
            }, 110);

        };
        $scope.uploadContactPic = function(file) {

            $scope.photoUrl = '/image/contacts/' + $scope.picFile.name
            file.upload = Upload.upload({
                url: '/api/contactImage',
                data: {contact: file, username: $scope.username}
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
    }
    
 ]);