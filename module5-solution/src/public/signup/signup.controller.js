(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['$filter', 'MenuService'];
    function SignupController($filter, MenuService){
        var signup = this;
        signup.user = {};

        var upCase = $filter('uppercase');
        
        signup.searchMenuItem = function () {
            signup.user.menuItem = false;
            if (signup.user.menunumber){
                signup.user.menunumber = upCase(signup.user.menunumber);
                
                var promise = MenuService.getItemInfo(signup.user.menunumber);
                promise.then(function (response) {
                    signup.user.menuItem = response.data;
                    signup.itemNotFound = false;
                },
                function (data) {
                    signup.itemNotFound = true;
                });
            }
        };

        signup.submit = function () {
            signup.completed = true;
            MenuService.signup(signup.user);
        };
    }

})();