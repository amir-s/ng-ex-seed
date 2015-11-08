!function () {

	function LoginController(AuthService, $rootScope) {
		var self = this;
		self.user = {};
		
		self.submit = function () {
			alert(self.user.username+":"+self.user.password);
			$rootScope.setSidebar(false);
		}
		
	}
	LoginController.$inject = ['AuthService', '$rootScope']
	angular.module(NG_MODULE).controller('LoginController', LoginController);
	
}();