(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
	var ddo = {
		templateUrl: 'foundItems.html',
		scope:{
			menu: '<myMenu',
			title: '@title',
			onRemove: '&'
		}
	};
	
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	menu.found = [];
	menu.searchFinished = false;
	menu.searchTerm = '';
	
	menu.getNumberOfItemsFromSearch = function(){
		return menu.found.length;
	}
	
	menu.removeItem = function(itemIndex){
		menu.found.splice(itemIndex, 1);
		menu.title = origTitle + " " + menu.getNumberOfItemsFromSearch();
	}
	
	var origTitle = "Number of items found: ";
	menu.title = origTitle + " " + menu.getNumberOfItemsFromSearch();
	
	menu.search = function(){
		var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
		
		promise.then(function (response) {
			menu.searchFinished = true;
			menu.found = response;
			menu.title = origTitle + " " + menu.getNumberOfItemsFromSearch();
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	menu.gotNoItemsFromSearch = function(){
		return (menu.searchFinished && menu.found.length == 0);
	}
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	service.menuItems = [];
	
	service.getMatchedMenuItems = function (searchTerm) {
		
		var promise = service.getMenuItems();
		
		return promise.then(function (response) {
			
			service.menuItems = response.data.menu_items;
			
			var foundItems = [];
			for (var i = 0; i < service.menuItems.length; i++) {
				var item = service.menuItems[i];
				var description = item.description;
				
				if (searchTerm.trim() != '' && description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
					foundItems.push(item);
				}
			}
			
			return foundItems;
		})
		.catch(function (error) {
			console.log("Something went terribly wrong.");
		});		
	};

	service.getMenuItems = function(){
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		});

		return response;
	};
}

})();