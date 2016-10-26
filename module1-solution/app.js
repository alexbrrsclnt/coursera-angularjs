(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	
	$scope.menu = "";
	$scope.message = "";
	$scope.messageStyle = {};
	$scope.check = function(){
		
		var messageEmpty = "Please enter data first";
		var messageOk = "Enjoy!";
		var messageFail = "Too much!";
		var colorEmpty = "red";
		var colorOk = "green";
		
		var menu = $scope.menu;
		var arrayMenu = menu.split(',');
		var totalMenuItems = countValidItems(arrayMenu);
		
		if (totalMenuItems == 0){
			setMessage(messageEmpty);
			setMessageStyle(colorEmpty);
		}
		else if (totalMenuItems <= 3){
			setMessage(messageOk);
			setMessageStyle(colorOk);
		}
		else {
			setMessage(messageFail);
			setMessageStyle(colorOk);
		}
	}
	
	function countValidItems(array){
		var totalValidItems = 0;
		for(var i = 0; i < array.length; i++){
			var item = array[i].trim();
			if (item != ''){
				totalValidItems++;
			}
		}
		return totalValidItems;
	}
	
	function setMessage(message){
		$scope.message = message;
	}
	
	function setMessageStyle(color){
		$scope.messageStyle = {
			"color" : color,
			"border" : "solid 1px " + color
		};
	}
}

})();

