'use strict';

define(['app'],function(app){
	
	var injectParams = ['$scope'];

	var homeController = function($scope){
		$scope.message = "It is your Dashboard";
	}

	homeController.$inject= injectParams;

	app.register.controller('HomeController',homeController);

});