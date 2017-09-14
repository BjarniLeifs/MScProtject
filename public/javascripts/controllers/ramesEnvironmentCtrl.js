'use strict';


app.controller('RamesEnvironmentCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory) {

		$timeout(
			function() {
				$scope.infos = aboutFactory.getRamesInfoByCategoryId(4);
			}, 200
		);
	}
]);