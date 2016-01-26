'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope'];

    var ContactController = function ($scope) {
    	$scope.contactname = 'Mohammed Safeer A R';
    	$scope.blog = 'http://safeeronline.wordpress.com';
    	$scope.github = 'safeer-in@github.com';
    };

    ContactController.$inject = injectParams;

    app.register.controller('ContactController', ContactController);

});