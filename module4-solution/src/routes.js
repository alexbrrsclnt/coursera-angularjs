(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	// Redirect to home page if no other URL matches
	$urlRouterProvider.otherwise('/');

	// *** Set up UI states ***
	$stateProvider
	
	// Home page
	.state('home', {
		url: '/',
		templateUrl: 'src/menuapp/templates/home.template.html'
	})
	
	.state('categories', {
		url: '/categories',
		templateUrl: 'src/menuapp/templates/categoriesList.template.html',
		controller: 'CategoriesController as categoriesList',
		resolve: {
			categoryElements: ['MenuDataService', function (MenuDataService) {
				return MenuDataService.getAllCategories();
			}]
		}
	})
	
	.state('categories.items', {
		url: '/{categoryShortName}/items',
		templateUrl: 'src/menuapp/templates/itemsList.template.html',
		controller: 'ItemsController as itemsList',
		resolve: {
			MenuDataService: 'MenuDataService',
			menuItems: function (MenuDataService, $stateParams) {
				var categoryShortName = $stateParams.categoryShortName;
				return MenuDataService.getItemsForCategory(categoryShortName);
			}
		}
	});
}

})();