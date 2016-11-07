(function(){
	'use strict';
	
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
	
	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuy = this;
		
		toBuy.items = ShoppingListCheckOffService.getToBuyItems();
		toBuy.hasItems = function(){
			return toBuy.items.length;
		}
		
		toBuy.markAsBought = function (itemIndex) {
			ShoppingListCheckOffService.markAsBought(itemIndex);
		};
	}
	
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBought = this;
		
		alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
		alreadyBought.hasItems = function(){
			return alreadyBought.items.length;
		}
	}
	
	function ShoppingListCheckOffService() {
		var service = this;
		
		var itemsToBuy = [
			{
				name: 'games',
				quantity: 10
			},
			{
				name: 'movies',
				quantity: 3
			},
			{
				name: 'books',
				quantity: 5
			},
			{
				name: 'comics',
				quantity: 7
			},
			{
				name: 'magazines',
				quantity: 2
			}
		];
		
		var itemsAlreadyBought = [];
		
		service.markAsBought = function (itemIndex) {
			var item = getItemToBuyOfIndex(itemIndex);
			removeToBuyItem(itemIndex);
			addAlreadyBoughtItem(item);
		};
		
		function getItemToBuyOfIndex(itemIndex){
			var item = itemsToBuy[itemIndex];
			return item;
		}
		
		function removeToBuyItem (itemIndex) {
			itemsToBuy.splice(itemIndex, 1);
		};
		
		function addAlreadyBoughtItem(item){
			itemsAlreadyBought.push(item);
		}
		
		service.getToBuyItems = function () {
			return itemsToBuy;
		};
		
		service.getAlreadyBoughtItems = function () {
			return itemsAlreadyBought;
		};
	}
	
})();
