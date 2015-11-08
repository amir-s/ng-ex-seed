!function () {

	function MainController ($rootScope) {
		var sidebar = true;
		$rootScope.isSidebarOpen = function () {
			return !sidebar;
		}
		$rootScope.setSidebar = function (v) {
			sidebar = v;
		}
	}
	MainController.$inject = ['$rootScope'];
	angular.module(NG_MODULE).controller('MainController', MainController);
	
}();