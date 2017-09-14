'use strict';


app.controller('RamesRolesCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(1);
			}, 200
		);
	}
]);