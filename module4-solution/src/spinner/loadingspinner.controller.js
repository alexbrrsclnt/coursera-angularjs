(function () {
'use strict';

	angular.module('Spinner')
	.controller('SpinnerController', SpinnerController);

	SpinnerController.$inject = ['$rootScope'];
	function SpinnerController($rootScope) {
		var $ctrl = this;

		var cancelListener = $rootScope.$on('menuapp:processing', function (event, data) {
			console.log("Event: ", event);
			console.log("Data: ", data);

			if (data.on) {
				$ctrl.showSpinner = true;
			}
			else {
				$ctrl.showSpinner = false;
			}
		});

		$ctrl.$onDestroy = function () {
			cancelListener();
		};
	};
})();