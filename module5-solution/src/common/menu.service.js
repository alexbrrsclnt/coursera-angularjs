(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.isUserRegistered = function () {
    if (service.user) {
      return true;
    }
    return false;
  }

  service.getUserRegisteredInfo = function () {
    return service.user;
  }

  service.signup = function (user) {
    service.user = user;
  };

  service.getItemInfo = function (itemShortName) {
    if (itemShortName) {

      var response = $http({
        method: "GET",
        url: (ApiPath + '/menu_items/' + itemShortName + '.json')
      });

      return response;  
    }
  }

}



})();
