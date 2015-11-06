!function () {

	function AuthService($http, $q) {
		
		var self = this;

		self.authenticate = authenticate;
		self.logout = logout;
		
		self.setUser = setUser;
		self.currentUser = null;

		function setUser(user) {
			self.currentUser = user;
		}

		function getUser() {
			return self.currentUser;
		}

		function authenticate(prop) {
			return $http.post('/api/auth', {username: prop.username, password: prop.password}).then(function (resp) {
				return resp.data;
			});	
		}

		function logout() {
			return $http.post('/api/logout').then(function (resp) {
				return resp.data;
			});	
		}

	}

	AuthService.$inject = ['$http', '$q'];
	angular.module(NG_MODULE).service('AuthService', AuthService);
}();