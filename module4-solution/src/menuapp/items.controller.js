(function () {
'use strict';

    angular.module('Data')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['MenuDataService','menuItems'];
    function ItemsController(MenuDataService, menuItems){
        var itemsList = this;
        itemsList.category = menuItems.data.category; 
        itemsList.items = menuItems.data.menu_items;
    }
})();