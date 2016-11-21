(function () {
'use strict';

    angular.module('Data')
    .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categoryElements'];
    function CategoriesController(categoryElements){
        var categoriesList = this;
        categoriesList.items = categoryElements.data;
    }
})();