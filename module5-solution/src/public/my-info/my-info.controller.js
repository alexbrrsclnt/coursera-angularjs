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
            if (typeof ctrl.user.menuItem !== 'undefined' && ctrl.user.menuItem != false) {
                return true;
            }
            return false;
        }
    }
})();