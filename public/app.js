var NG_MODULE = 'MyApp'
!function () {
	angular.module(NG_MODULE, ['ui.router']);
}();
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
!function () {

	angular.module(NG_MODULE)

	.run([
	 'Capture',
	 '$rootScope',
	 function(Capture, $rootScope) {
		 $rootScope.$on('routeChangeSuccess', function() {
			 Capture.resetAll();
		 });
	 }
	])

	.factory('Capture', [
	 '$compile',
	 function($compile) {
		 var yielders = {};
		 return {
			 resetAll: function() {
				 for (var name in yielders) {
					if (yielders.hasOwnProperty(name)) {
						this.resetYielder(name);
					}
				 }
			 },

			 resetYielder: function(name) {
				 var b = yielders[name];
				 this.setContentFor(name, b.defaultContent, b.defaultScope);
			 },

			 putYielder: function(name, element, defaultScope, defaultContent) {
				 var yielder = {};
				 yielder.name = name;
				 yielder.element = element;
				 yielder.defaultContent = defaultContent || '';
				 yielder.defaultScope = defaultScope;
				 yielders[name] = yielder;
			 },

			 getYielder: function(name) {
				 return yielders[name];
			 },

			 removeYielder: function(name) {
				 delete yielders[name];
			 },

			 setContentFor: function(name, content, scope) {
				 var b = yielders[name];
				 if (!b) {
					 return;
				 }
				 b.element.html(content);
				 $compile(b.element.contents())(scope);
			 }

		 };
	 }
	])


	.directive('uiContentFor', [
	 'Capture',
	 function(Capture) {
		 return {
			 compile: function(tElem, tAttrs) {
				 var rawContent = tElem.html();
				 if(tAttrs.uiDuplicate === null || tAttrs.uiDuplicate === undefined) {
					 // no need to compile anything!
					 tElem.html('');
					 tElem.remove();
				 }
				 return function(scope, elem, attrs) {
					 Capture.setContentFor(attrs.uiContentFor, rawContent, scope);
				 };
			 }
		 };
	 }
	])

	.directive('uiYieldTo', [
	 '$compile', 'Capture', function($compile, Capture) {
		 return {
			 link: function(scope, element, attr) {
				 Capture.putYielder(attr.uiYieldTo, element, scope, element.html());

				 element.on('$destroy', function(){
					 Capture.removeYielder(attr.uiYieldTo);
				 });

				 scope.$on('$destroy', function(){
					 Capture.removeYielder(attr.uiYieldTo);
				 });
			 }
		 };
	 }
	]);

}();
!function () {

	function capitalize() {
		return function (input, format, separator) {
			if (!input) {
				return input;
			}
			format = format || 'all';
			separator = separator || ' ';
			if (format === 'first') {
				// Capitalize the first letter of a sentence
				var output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
				if (separator === ' ') {
					return output;
				} else {
					return output.split(separator).join(' ');
				}
			} else {
				return input.split(separator).map(function(word) {
					if (word.length === 2 && format === 'team') {
						// Uppercase team abbreviations like FC, CD, SD
						return word.toUpperCase();
					} else {
						return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
					}
				}).join(' ');
			}
		}
	};

	angular.module(NG_MODULE).filter('capitalize', capitalize);
	
}();
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
!function () {

	function config () {
		// basic configurations go here
	}
	config.$inject = [];
	angular.module(NG_MODULE).run(config);
	
}();



!function () {

	angular.module(NG_MODULE)
		.constant('VERSION', '0.0.1');

}();

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