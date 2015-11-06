!function () {

	function LoginController(AuthService) {
		var self = this;
		self.user = {};
		
		self.submit = function () {
			alert(self.user.username+":"+self.user.password);
		}
		
	}
	LoginController.$inject = ['AuthService']
	angular.module(NG_MODULE).controller('LoginController', LoginController);
	
}();