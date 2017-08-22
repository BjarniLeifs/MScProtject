/* Network Controller*/

app.controller('NetworkCtrl', ['$scope','$timeout','network', 'contact', '$state', '$stateParams','auth',
    function ($scope, $timeout, network, contact, $state, $stateParams, auth) {
        $scope.isAdmin = auth.isAdmin();
        $scope.isMod = auth.isMod();
        $scope.isWriter = auth.isWriter();
    	$scope.AllNetworks = network.getNetwork();
        $scope.networkName ={};

        $scope.update = network.getNetworkByName($stateParams.name);

        $scope.addNetwork = function () {
            var object = {
                name        : $scope.networkName.name,
                id_contact : $scope.data.contactSelected.id
            };

            network.addNetwork(object); 
            $scope.name = '';
            $scope.data.contactSelected.id = ''; 
            $timeout(function() {
               var temp = network.getNetwork();
               $scope.AllNetworks = temp;
            }, 110);
        };

        $scope.data = {
           contactAvailable : contact.getAllContacts(),
           contactSelected : {id: contact.id, name: contact.name}
        };

        $scope.updateNetwork = function () {
            network.updateNetwork($scope.update);
            var temp = $scope.update;
            $scope.update = temp;
            $timeout(function() { 
                $state.go('home.network');
            }, 100);
        };
 	}
 ]);