!function () {

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('login');
		// Now set up the states
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/templates/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
	}
	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	angular.module(NG_MODULE).config(config);
	
}();