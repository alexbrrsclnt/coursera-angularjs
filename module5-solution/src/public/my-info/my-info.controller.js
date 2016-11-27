(function(){
    'use strict';

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService'];
    function MyInfoController(MenuService) {
        var ctrl = this;

        ctrl.isUserRegistered = function () {
            if (MenuService.isUserRegistered()){
                ctrl.getUserRegisteredInfo();
                return true;
            }
            else{
                return false;
            }
        }

        ctrl.getUserRegisteredInfo = function () {
            ctrl.user = MenuService.getUserRegisteredInfo();
        }

        ctrl.isMenuItemChoice = function () {
            if (ctrl.user.menuItem.name){
                return true;
            }
            return false;
        }
    }
})();