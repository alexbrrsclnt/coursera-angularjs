(function () {
'use strict';

angular.module('Data', [])
.controller('MenuDataController', MenuDataController);

MenuDataController.$inject = ['$rootScope', 'MenuDataService'];
function MenuDataController($rootScope, MenuDataService) {
    var data = this;

	data.getCategories = function(){
		console.log('ENTRA DATA MODULE GET CATEGORIES')
		var promise = MenuDataService.getAllCategories();

		promise.then(function (response) {
			console.log(response);
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});

		return promise;
	}

	data.selectCategory = function(){

	}
}

})();