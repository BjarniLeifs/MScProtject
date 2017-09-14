'use strict';

app.controller('AboutCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'aboutFactory', 'categoryFactory', 
	function ($scope, $state, $stateParams, $location, $timeout, aboutFactory, categoryFactory) {

	    $timeout(
			function() {
				$scope.categories = categoryFactory.getCategoryOrdSeq();
			}, 200
		);  

		$timeout(
			function() {
				$scope.ramesinfo = aboutFactory.getRamesInfo();
			}, 200
		);

	}
]);

