!function () {

	function autoFocus($timeout) {
		return {
	        restrict: 'AC',
	        link: function(_scope, _element) {
				$timeout(function(){
					_element[0].focus();
				}, 0);
			}
		}
	}

	autoFocus.$inject = ["$timeout"];

	angular.module(NG_MODULE).directive('autoFocus', autoFocus);
	
}();