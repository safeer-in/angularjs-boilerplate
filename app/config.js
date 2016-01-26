require.config({
	baseUrl:'/app',
	urlArgs: 'v=1.0',
	paths:{
		app : 'app',
		routeResolver : 'utilities/services/routeResolver'
	}
});

require([
	'app',
	'routeResolver'
	],function(){
	angular.bootstrap(document,['app']);
});